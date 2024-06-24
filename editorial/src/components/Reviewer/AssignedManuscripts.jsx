
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import PageIterate from "../PageIterate.jsx";
import { MdOutlineCancel } from "react-icons/md";
import BackToMenu from "../BackToMenu";
import  {useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";



function AssignedManuscripts() {
    const {manuscriptId} = useParams();
    const [data,setData]= useState ([]);
    const [loading,setLoading]= useState(true);
    useEffect(()=>{
      const fetchData = async () =>
     { try {
        const response = await axios.get(`http://localhost:3000/reviewer/getManuscripts`);
        setData(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }}
      fetchData();
    },[])
  
    return (
      <div className="py-10 bg-slate-100 h-screen ">
     <BackToMenu href="/reviewer">Reviewers Menus</BackToMenu>
      {loading  ?
         <DataLoading /> 
          : !data.length ?
            <Nodata/> :
            <DataTable data={data}  />}
      {/* {!loading && !data.length && <Nodata />} */}
      {/* {JSON.stringify(data)}; */}
    </div>
    )
}

export default AssignedManuscripts ;



function DataLoading() {
  return (
    <div className="p-4  text-center ">
      <p className="mb-6">Loading data ...</p>
    </div>
  );
}

function Nodata() {
  return (
    <div className="p-4  text-center ">
      <p className="mb-6">No Manuscripts to review the moment.</p>
   
    </div>
  );
}


function TableRow({currentData})
{
 const [isAction,setIsAction] = useState(false);
 const [actionId,setActionId] = useState(0);
 const [title,setTitle]= useState(null);
 const [abstract,setAbstract]= useState(null);
 const navigateTo = useNavigate();
 const toggleAction = ()=>{
  setIsAction(!isAction);
 }
 const handleEdit = (id,abstract,title) => {
  setIsAction(!isAction);
  setAbstract(abstract);
  setTitle(title);
  setActionId(id);
 }
 const handleDownload= (path,title)=>{
    
  // Create a temporary link element
  const link = document.createElement('a');
  link.href = "http://localhost:3000/"+path;
  link.download = title+".pdf";
  link.target = '_blank'; // Open the PDF in a new tab/window

  // Append the link to the document and click it to initiate the download
  document.body.appendChild(link);
  link.click();

  // Remove the temporary link element
  document.body.removeChild(link);
}
  return (
    <>
    {currentData.map((item, index) => (
      
        <tr
          key={index}
          className={
            " border-b transition duration-300 ease-in-out " +
            (Number(index) % 2 != 0
              ? "bg-white hover:bg-gray-300"
              : "bg-gray-50 hover:bg-gray-300")
          }
        >
          
          <td
            className={
              "text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal"
            }
          >
            {item.title}
          </td>
          <td
           style={{
            maxWidth: '200px', /* Adjust the max-width as needed */
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }} className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal">
            
            {item.abstract}
          </td>
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal">
            {item.affiliation  }
          </td>
      
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal">
            {item.upoladDate }
          </td>
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal">
            {new Date(item.dueDate).toISOString().split('T')[0]   }
          </td>    
          <td
            className={
              "text-sm text-gray-900 font-normal px-6 py-4 grid gap-y-2 whitespace-normal "
            }
          >
            <button className="bg-blue-300 px-3 py-1 hover:bg-blue-200 rounded-md" onClick={()=>{handleDownload(item.filePath)}} >Download Manuscript </button>
          </td>
          <td
            className={
              "text-sm text-gray-900 font-normal px-6 py-4 grid gap-y-2 "
            }
          >
            <button className="bg-blue-300 px-3 py-1 hover:bg-blue-200 rounded-md" onClick={()=>{navigateTo(`/reviewer/manuscripts/submitReview/${item._id}`)}} >Review this </button>
          </td>
          {/* Add more cells for other properties if needed */}
        </tr>
    ))}
    </>
  )

}


function DataTable({ data }) {
  const [currentData,setCurrentData] = useState([]);
  function getCurrentData(dataformChild)
  {
      setCurrentData(dataformChild);
  }
  return (
    <>
         <PageIterate data={data} dataSlice={getCurrentData} numberOfPages={4}  />
      <table
        className={
          " shadow-md border min-w-full " + (data.length == 0 && "hidden")
        }
      >
        <thead className="bg-slate-300 border-b border-black">
          <tr>
          
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Title
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Abstract
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Affiliation
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            upoladDate
            </th>
            <th className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
            dueDate
            </th>
            <th className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
            Review
            </th>
            {/* */}
          </tr>
        </thead>
        <tbody className="">
            <TableRow currentData={currentData}/>
        </tbody>
      </table>
    </>
  );
}

