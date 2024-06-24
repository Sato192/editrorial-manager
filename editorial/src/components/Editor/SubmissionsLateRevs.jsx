

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import PageIterate from "../PageIterate.jsx";
import { MdOutlineCancel } from "react-icons/md";
import BackToMenu from "../BackToMenu";
import  {useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";



function SubmissionsLateRevs() {
    const {manuscriptId} = useParams();
    const [data,setData]= useState ([]);
    const [loading,setLoading]= useState(true);
    useEffect(()=>{
      const fetchData = async () =>
     { try {
        const response = await axios.get(`http://localhost:3000/editor/`)
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }}
      fetchData();
    },[])
  
    return (
      <div className="py-10 bg-slate-100 h-screen ">
     <BackToMenu href="/editor">Menu de l'editor</BackToMenu>
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

export default SubmissionsLateRevs ;



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
 const toggleAction = ()=>{
  setIsAction(!isAction);
 }
 const handleEdit = async (editorId) => {
  try {
    const response = await axios.post('http://localhost:3000/editor/assignEditor',
      {
        editorId : editorId ,
        manuscriptId : manuscriptId
      }
    )
    console.log(response.data);
    navigateTo('/editor/ShowManuscript');
  }
  catch(error)
  {
    console.log(error);
  }
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
            {item.name}
          </td>
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal">
            {item.email}
          </td>
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal">
            {item.manuscripts.length  }
          </td>
     
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal">
            {item.admin ? "true" : "false"}
          </td>
      
          <td
            className={
              "text-sm text-gray-900 font-normal px-6 py-4 grid gap-y-2 place-content-start"
            }
          >
            <button className="bg-blue-300 px-3 py-1 hover:bg-blue-200 rounded-md" onClick={()=>{handleEdit(item._id)}} >Assign to this editor</button>
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
              editor Name
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              email
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              manuscripts
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              admin
            </th>
            <th className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
              assign
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

