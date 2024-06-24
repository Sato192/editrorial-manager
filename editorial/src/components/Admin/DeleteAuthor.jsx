import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import PageIterate from "../PageIterate";
import { MdOutlineCancel } from "react-icons/md";
import BackToMenu from "../BackToMenu";
import { useNavigate } from "react-router-dom";

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
      <p className="mb-6">No Authors found.</p>
   
    </div>
  );
}



function TableRow({currentData})
{
const navigateTo = useNavigate();
 const handleEdit = async (id) => {
  try{
    const response = await axios.post(`http://localhost:3000/admin/removeAuthor`,{
      id : id
    })
    const data=response.data;
    console.log(data);
    if(data)
      {
        navigateTo('/admin');
      }
    
  }
  catch(error){
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
            {item._id}
          </td>
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal">
            {item.name}
          </td>
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal">
            {item.email}
          </td>

          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal">
            {item.manuscripts.length }
          </td>
          <td
            className={
              "text-sm text-gray-900 font-normal px-6 py-4 grid gap-y-2 place-content-start"
            }
          >
            <button className="bg-red-300 px-3 py-1 hover:bg-red-200 rounded-md" onClick={()=>{handleEdit(item._id)}} >Delete</button>
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
            Author Id
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Author full name
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Author email
            </th>

            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Manuscripts
            </th>
            <th className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
              Delete
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



function DeleteAuthor() {
  const [data,setData]= useState ([]);
  const [loading,setLoading]= useState(true);
  useEffect(()=>{
    const fetchData = async () =>
   { try {
      const response = await axios.get('http://localhost:3000/admin/getAuthor')
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
   <BackToMenu href="/admin">Back to Menu</BackToMenu>
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

export default DeleteAuthor;