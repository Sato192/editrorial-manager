import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';
function BacktoAuthor() {
    const {manuscriptId} = useParams();
    const [note,setNote]= useState();
    const [status,setStaus] = useState();
    const navigateTo= useNavigate();
    const handleSubmit= async (e)=>{
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/editor/backToAuthor',
                {
                    manuscriptId: manuscriptId,
                    note : note,
                    status : status
                }
            )
            console.log(response.data);
            navigateTo("/editor")
        }   
        catch (error)
        {
            console.log(error)
        }
    }
  return (
    <form >
    <div className='bg-slate-200 space-y-7 p-4 flex flex-col justify-center items-center '>
    <label className='place-self-start' htmlFor="editor_note">Editor's note:</label>
    <textarea onChange={(e)=>setNote(e.target.value)} required className='p-4 ring-1 ring-black w-full h-96 resize-none' name='editor_note' placeholder='Place your notes here'></textarea>
    <div className='flex justify-center items-center space-x-10'>
                    <div className='space-x-2'>
                    <label htmlFor="accept">Accept </label>
                    <input onChange={e=>setStaus('Accepted')} id="accept" className='hover:scale-125' type='radio' value='accept' name="my_choise"></input>
                    </div>
                    <div  className='space-x-2'> 
                    <label htmlFor="reject">Reject </label>
                    <input onChange={e=>setStaus('Rejected')}  id="reject" type='radio' className='hover:scale-125' value='reject' name="my_choise"></input>
                    </div>
                    <div className='space-x-2'>
                    <label htmlFor="Major revision">Major revision </label>
                    <input onChange={e=>setStaus('Major revision')}  id="Major revision" type='radio' className='hover:scale-125' value='Major revision' name="my_choise"></input>
                    </div>
                    <div className='space-x-2'>
                    <label htmlFor="Minor revision">Minor revision </label>
                    <input onChange={e=>setStaus('Minor revision')}  id="Minor revision" type='radio' className='hover:scale-125' value='Minor revision' name="my_choise"></input>
                    </div>
           
    </div>
    <button onClick={(e)=>handleSubmit(e)} className='bg-blue-400 px-4 py-2 text-white font-medium rounded-md hover:bg-blue-600'>Send back to author</button> 
  </div>
  </form>
  )
}

export default BacktoAuthor