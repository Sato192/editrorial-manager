import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import PageIterate from "../PageIterate";
import { MdOutlineCancel } from "react-icons/md";
import BackToMenu from "../BackToMenu";
import  {useNavigate} from "react-router-dom";
import LoadingScreen from "../LoadingScreen.jsx"
function SendEmail({title,abstarct,manuscript}) {
  const text=`
<p>Dear [Reviewer’s Name],</p>

<p>I hope this message finds you well.</p>

<p>We are pleased to inform you that you have been selected to review a manuscript titled “<strong>${title}</strong>” for [Journal/Conference Name]. Your expertise in [relevant field/subject area] makes you an ideal candidate for this task.</p>

<p><strong>Manuscript Details:</strong></p>
<ul>
    <li><strong>${title}:</strong> [Manuscript Title]</li>
    <li><strong>${abstarct}:</strong> [Brief Abstract]</li>
</ul>

<p>We believe your insights and feedback will be invaluable in ensuring the quality and relevance of the work. Please find the manuscript attached to this email. We kindly request that you complete your review by [due date], adhering to the guidelines provided.</p>

<p>To confirm your participation, please respond to this email at your earliest convenience. Should you be unable to accept this review assignment, we would appreciate any recommendations for alternate reviewers.</p>

<p>Thank you in advance for your time and contribution to the scholarly community. If you have any questions or require additional information, please do not hesitate to contact us.</p>

<p>Best regards,</p>

<p>[Your Full Name]<br>
[Your Position]<br>
[Your Institution/Organization]<br>
[Contact Information]</p>`
  const [isDone,setIsDone]= useState(false);
  const [loading,setLoading]= useState(false);
  const [emailBody,setEmailBody]= useState(text);
  const [email,setEmail]= useState(null);
  const [click,setClick]= useState(true);
  const [date,setDate]= useState(null);
  const navigateTo = useNavigate();
  const handleSubmit = async (e) =>{

    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/editor/AssignviaEmail", {
        date : date,
        manuscriptId : manuscript,
        email: email,
        body: emailBody,
      });
      if(response.data==='done')
        {
          setIsDone(true)

        }
      setLoading(false);
      setTimeout(() => {
        navigateTo('/editor');
      }, 2000);
       
    }
    catch (error) {
      console.error("Error sending data:", error);

    }
  }
  return (
    click && 
    <div onClick={() => setClick(!click)} className='mt-4 flex h-auto items-center justify-center fixed inset-0 bg-opacity-75 bg-gray-900'>
      <main onClick={(e) => e.stopPropagation()} className='mt-5 bg-indigo-100 shadow-md rounded-md w-1/2 py-5 px-10'>
        <h1 className='text-center font-bold text-gray-800 mb-4'>Assign a Reviewer for: {title}, who is not registered in Editorial Manager</h1>
        <form onSubmit={handleSubmit} className='grid grid-cols-2 justify-center'>
          {isDone && <h1 className='col-span-2 flex justify-center items-center text-green-800 mb-2'>Email sent!</h1>}
          <label className='col-span-2 flex justify-center items-center'>
            Email Body
          </label>
          <textarea
            onChange={e => setEmailBody(e.target.value)}
            value={text}
            placeholder="Write your reviews for the manuscript here"
            autoFocus
            className='bg-white-100 col-span-2 text-gray-800 border-2 resize-none h-72 border-gray-300 rounded-md p-2'
          ></textarea>
          <div className='my-2 py-2 col-span-2 flex justify-center items-center px-1 space-x-5 rounded-md border-t border-gray-300 mx-3'>
            <label>Email:</label>
            <input
              onChange={e => setEmail(e.target.value)}
              required
              className='border-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              type='text'
            />
            <label>Due Time:</label>
            <input
              onChange={e => setDate(e.target.value)}
              min="2024-06-12"
              max="2026-06-12"
              required
              className='border-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              type='date'
            />
          </div>
          <div className='col-span-2 flex justify-center mt-5'>
            <button type='submit' className='text-2xl bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300'>Submit</button>
          </div>
        </form>
        {loading && <LoadingScreen />}
      </main>
    </div>
  )
}



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
      <p className="mb-6">No manuscript at the moment.</p>
   
    </div>
  );
}
function ActionButton(props)
{
 
  return(
    <a href={props.href} className="p-2 text-gray-950 text-center bg-blue-300 hover:bg-blue-100 rounded-md font-medium" >{props.children} </a>

  )
}
function Action(props)
{
  const [email,setEmail]=useState(false);
  const  [admin , setAdmin]= useState(false);
  const [loading,setloading]= useState(true);
  const [manuscript , setManuscript]= useState(null);
  useEffect( () =>{
    const getEditor = async () =>{
      try {
        const response = await axios.get("http://localhost:3000/editor/admin")
        setAdmin(response.data);
        console.log(admin);
      }
      catch(error){
        console.log(error);
      }
    }
    getEditor();
  },[])
  const navigateTo = useNavigate();
  const handleAssignToMyself = async () =>{

    try {
      const response = await axios.post('http://localhost:3000/editor/Assignmyself',{
          id : props.id }
        )
        console.log(response.data);
        navigateTo('/editor');
    }
    catch (error)
    {
      console.log(error);
    }
  }
  const HandleEmail = (manuscriptId)=>{
    console.log("hh");
    setEmail(!email);
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
    <div  className=" flex  justify-center items-center fixed inset-0  bg-gray-300  bg-opacity-15" >

        <div  onClick={(e)=>e.stopPropagation()}  className=" bg-white  rounded-md shadow-md ">
        {email && <SendEmail title={props.title} abstarct={props.abstarct} manuscript={props.id} />}

          <div className="flex text-xl  justify-between bg-gray-300 px-2 py-1 mb-3">
            <h1>Choose what to do</h1>
           
            <button className="hover:text-red-500" onClick={props.toggleAction} > <MdOutlineCancel /></button>
          </div>
          <div className=" grid mx-16  gap-2 mb-3 ">
          <button 
             onClick ={()=>handleDownload(props.filePath)}
            className="p-2 text-gray-950 bg-blue-300 hover:bg-blue-100 rounded-md font-medium" 
           > Download Manuscript </button>
            {admin && <button 
            onClick={handleAssignToMyself}
            className="p-2 text-gray-950 bg-blue-300 hover:bg-blue-100 rounded-md font-medium" 
           > Assign to Myself </button>}
            {admin && <ActionButton href={"/editor/AssignEditor/"+(props.id)}> Assign  editor </ActionButton>}
            <ActionButton href={"/editor/ShowManuscript/"+(props.id)}  >Details</ActionButton>
            <ActionButton href={"/editor/AssignReveiwer/"+(props.id)}> Assigning Reviewers </ActionButton>
            <ActionButton href={"/editor/sendToAuthor/"+(props.id)}> Send Back to Author </ActionButton>
             <button 
             onClick ={()=>HandleEmail(props.id)}
            className="p-2 text-gray-950 bg-blue-300 hover:bg-blue-100 rounded-md font-medium" 
           > Assign Reviewer via Email </button>

          </div>
        </div>
    </div>
  )
}

function TableRow({currentData})
{
 const [isAction,setIsAction] = useState(false);
 const [actionId,setActionId] = useState(0);
 const [title,setTitle]= useState(null);
 const [filePath,setFilePath]= useState(null);
 const [abstract,setAbstract]= useState(null);
 const toggleAction = ()=>{
  setIsAction(!isAction);
 }
 const handleEdit = (id,abstract,title,filePath) => {
  setIsAction(!isAction);
  setAbstract(abstract);
  setFilePath(filePath);
  setTitle(title);
  setActionId(id);
 }
  return (
    <>
     {isAction && <Action filePath={filePath} abstarct={abstract} title={title} id={actionId} toggleAction={toggleAction} />}
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
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal">
            {item.M_type }
          </td>
          <td
           style={{
            maxWidth: '200px', /* Adjust the max-width as needed */
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}
           className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal">
            {item.abstract}
          </td>
       

          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal">
            {item.author.name}
          </td>
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal">
            {item.upoladDate}
          </td>
          <td
            className={
              "text-sm text-gray-900 font-normal px-6 py-4 grid gap-y-2 place-content-start"
            }
          >
            <button className="bg-blue-300 px-3 py-1 hover:bg-blue-200 rounded-md" onClick={()=>{handleEdit(item._id,item.abstract,item.title,item.filePath)}} >Take Action</button>
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
              Manuscript Title
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Manuscript Type
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              abstract
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              authorName
            </th>

            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Submission date
            </th>
 
            <th className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
              Action
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



function ShowManuscripts() {
  const [data,setData]= useState ([]);
  const [loading,setLoading]= useState(true);
  useEffect(()=>{
    const fetchData = async () =>
   { try {
      const response = await axios.get('http://localhost:3000/editor/newSubmissions')
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

export default ShowManuscripts;