

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import PageIterate from "../PageIterate.jsx";
import { MdOutlineCancel } from "react-icons/md";
import BackToMenu from "../BackToMenu";
import  {useNavigate} from "react-router-dom";
import LoadingScreen from "../LoadingScreen.jsx"
import { useParams } from "react-router-dom";



function SubmissionsUnderReview() {
    const {manuscriptId} = useParams();
    const [data,setData]= useState ([]);
    const [loading,setLoading]= useState(true);
    useEffect(()=>{
      const fetchData = async () =>
     { try {
        const response = await axios.get(`http://localhost:3000/editor/manuscriptsUnderReveiw`)
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }}
      fetchData();
    },[])
  
    return (
      <div className="py-10 bg-slate-100 h-screen ">
     <BackToMenu href="/editor">Editor Menu</BackToMenu>
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

export default SubmissionsUnderReview ;



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
      <p className="mb-6">No Manuscripts  'Under Reviewe 'at the moment.</p>
   
    </div>
  );
}


function TableRow({currentData})
{
 const [isAction,setIsAction] = useState(false);
 const [actionId,setActionId] = useState(0);
 const [title,setTitle]= useState(null);
 const [abstract,setAbstract]= useState(null);
 const {manuscriptId} = useParams();
 const navigateTo = useNavigate();
 const [email,setEmail]= useState(false);
 const toggleAction = ()=>{
  setIsAction(!isAction);
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
            maxWidth: '400px', /* Adjust the max-width as needed */
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}
           className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal">
            {item.abstract}
          </td>
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal">
            {item.status }
          </td>
     
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal">
            {item.upoladDate}
          </td>
          <td 
            className={
              "text-sm text-gray-900 font-normal px-6 py-4 "
            }
          >  
                              <button onClick={()=>handleDownload(item.filePath,item.title)}
                    className='bg-blue-500 text-white  rounded-lg shadow-md p-2 hover:bg-blue-700 transition duration-300'>Download Manuscript</button>
          </td>
          <td 
            className={
              "text-sm text-gray-900 font-normal px-6 py-4 "
            }
          >  
            <button className="bg-orange-300 px-3 py-1 hover:bg-orange-200 rounded-md" onClick={()=>navigateTo(`/editor/submissionsUnderReview/${item._id}`)} >See Reviews</button>
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
              abstract
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Status
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Submission Date
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Donwload manuscript
            </th>
            <th className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
              Contact Author
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

