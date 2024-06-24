import React from 'react'
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa6";
import BackToMenu from '../../BackToMenu';

function Detailpage() {
  const { manuscriptId } = useParams();
  console.log(manuscriptId);
  const [manuscript, setmanuscript] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [showFile, setShowFile] = useState(false);
  const [showreview, setShowreview] = useState(false);
  const toggleShowInfo = () => {
    setShowInfo(!showInfo);
  }
  const toggleShowFile = () => {
    setShowFile(!showFile);

  }
  const toggleShowReview = () => {
    setShowreview(!showreview);

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
  useEffect(() => {
    const fetchDataByid = async () => {
      try {
        const response = await axios.post(`http://localhost:3000/editor//getManuscriptById`,
          {
            id : manuscriptId
          }
        );
        setmanuscript(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchDataByid();
  }, []);
  return (
    <div className=' pt-6 text-gray-900' >
      <BackToMenu href={"/editor/Assignments"}>Previous page</BackToMenu>
      <h1 className=' text-center text-3xl mt-2 border-b-2 mb-4  font-semibold rounded-sm px-4' >  details of : {manuscript.title}</h1>
      <div className='grid  border grid-cols-3 justify-center text-left px-5 bg-gradient-to-r from-slate-100 to-blue-100 rounded-md shadow-md gap-4 mx-10 mb-4 ' >
        <h1 onClick={toggleShowInfo} className='  hover:font-medium rounded-md col-span-3 border-b text-xl font-normal pl-5' >
          Manuscript Information :   {showInfo ? <FaCaretUp /> : <FaCaretDown /> }
         </h1>
        {showInfo && <> <h1>Manusript Title :</h1> <h1 className='col-span-2'>{manuscript.title}</h1>
          <h1>manuscript Submitted day:</h1> <h1 className='col-span-2'>{manuscript.upoladDate}</h1>
          <h1>abstract:</h1> <h1 className='col-span-2'>{manuscript.abstract} </h1>
          <h1>author Name:</h1> <h1 className='col-span-2'>{manuscript.author.name}</h1>
          <h1>author Email:</h1> <h1 className='col-span-2'>{manuscript.author.email}</h1>
          <h1>affiliation:</h1> <h1 className='col-span-2'>{manuscript.affiliation}</h1>
          <h1>co-Author:</h1> <h1 className='col-span-2'>{manuscript.coAuthor}</h1> </>}
      </div>
      <div className='grid border grid-cols-3 justify-center text-left px-5 bg-gradient-to-r from-slate-100 to-blue-100 rounded-md shadow-md gap-4 mx-10  mb-4' >
        <h1 onClick={toggleShowFile} className='hover:font-medium col-span-3 border-b text-xl font-normal pl-5' >
           Files :  {showFile ? <FaCaretUp /> : <FaCaretDown /> } </h1>
           {showFile && <div className='flex justify-center items-center col-span-3' > 
            <button 
             onClick ={()=>handleDownload(manuscript.filePath)}
            className="p-2 m-9 text-gray-950 bg-blue-300 hover:bg-blue-100 rounded-md font-medium" 
           > Download Manuscript </button>
            </div>}
      </div>
    

    </div>
  )
}

export default Detailpage