

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import PageIterate from "../PageIterate.jsx";
import { MdOutlineCancel } from "react-icons/md";
import BackToMenu from "../BackToMenu";
import  {useNavigate} from "react-router-dom";
import LoadingScreen from "../LoadingScreen.jsx"
import { useParams } from "react-router-dom";

function SendEmail({name,email}) {
  
  const [isDone,setIsDone]= useState(false);
  const [loading,setLoading]= useState(false);
  const [click,setClick]= useState(true);
  const [emailBody,setEmailBody]= useState();
  const [date,setDate]= useState(null);
  const navigateTo = useNavigate();
  const handleSubmit = async (e) =>{

    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/editor/sendNormalEmail", {
        email: email,
        body: emailBody,
      });
      if(response.data==='done')
        {
          setIsDone(true)
        }
      setLoading(false);
        navigateTo(0);
    }
    catch (error) {
      console.error("Error sending data:", error);

    }
  }
  return (
    <div
  
  className="flex h-auto items-center justify-center fixed inset-0 bg-opacity-75 bg-slate-100"
>
  <main
    onClick={(e) => e.stopPropagation()}
    className="mt-5 bg-gradient-to-r from-blue-200 via-gray-200 to-slate-200 shadow-md rounded-md w-1/2 py-5 px-8"
  >
    <h1 className="text-center font-bold mb-4">
      Send Email to: {name}
    </h1>
    <form onSubmit={(e) => handleSubmit(e)} className="grid grid-cols-2 gap-4">
      {isDone && (
        <h1 className="col-span-2 flex justify-center items-center text-green-800 mb-2">
          Email sent!
        </h1>
      )}
      <label className="col-span-2 flex justify-center items-center">
        Email Body
      </label>
      <textarea
        required
        onChange={(e) => setEmailBody(e.target.value)}
        placeholder="Write your email here..."
        autoFocus
        className="bg-slate-50 col-span-2 text-purple-950 border-2 resize-none h-72 border-black rounded-md p-2"
      ></textarea>
      <div className="my-2 py-2 col-span-2 flex flex-col items-center px-1 space-y-2 rounded-md border-t border-purple-900 mx-3">
        <label className="mb-1">Email:</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          className="border-2 border-black p-2 rounded-md w-full"
          type="email"
          placeholder="Recipient's email"
        />
      </div>
      <div className="col-span-2 flex justify-center mt-3">
        <button
          type="submit"
          className="text-2xl bg-purple-950 text-white p-2 rounded-lg shadow-md hover:bg-purple-700 transition duration-300 ease-in-out"
        >
          SUBMIT
        </button>
      </div>
    </form>
    {loading && <LoadingScreen />}
  </main>
</div>

  )
}


function SubmissionBackToAuthor() {
    const {manuscriptId} = useParams();
    const [data,setData]= useState ([]);
    const [loading,setLoading]= useState(true);
    useEffect(()=>{
      const fetchData = async () =>
     { try {
        const response = await axios.get(`http://localhost:3000/editor/SubmissionSendToAuthorForApproval`)
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

export default SubmissionBackToAuthor ;



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
      
          <td onClick={()=>{setEmail(!email)}}
            className={
              "text-sm text-gray-900 font-normal px-6 py-4 grid gap-y-2 place-content-start"
            }
          >

          { email && <SendEmail name={item.author.name} email={item.author.email} />}
            <button className="bg-orange-300 px-3 py-1 hover:bg-orange-200 rounded-md" onClick={()=>{setEmail(!email)}} >Send Email to author</button>
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

