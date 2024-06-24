import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import LoadingScreen from '../../LoadingScreen';
const text=`
<p>Dear [Reviewer’s Name],</p>

<p>I hope this message finds you well.</p>

<p>We are pleased to inform you that you have been selected to review a manuscript titled “<strong>[Manuscript Title]</strong>” for [Journal/Conference Name]. Your expertise in [relevant field/subject area] makes you an ideal candidate for this task.</p>

<p><strong>Manuscript Details:</strong></p>
<ul>
    <li><strong>Title:</strong> [Manuscript Title]</li>
    <li><strong>Abstract:</strong> [Brief Abstract]</li>
</ul>

<p>We believe your insights and feedback will be invaluable in ensuring the quality and relevance of the work. Please find the manuscript attached to this email. We kindly request that you complete your review by [due date], adhering to the guidelines provided.</p>

<p>To confirm your participation, please respond to this email at your earliest convenience. Should you be unable to accept this review assignment, we would appreciate any recommendations for alternate reviewers.</p>

<p>Thank you in advance for your time and contribution to the scholarly community. If you have any questions or require additional information, please do not hesitate to contact us.</p>

<p>Best regards,</p>

<p>[Your Full Name]<br>
[Your Position]<br>
[Your Institution/Organization]<br>
[Contact Information]</p>`
function SendEmail({reviewer}) {
  const [isDone,setIsDone]= useState(false);
  const [loading,setLoading]= useState(false);
  const [emailBody,setEmailBody]= useState(text);
  const [email,setEmail]= useState(reviewer.email);
  const [click,setClick]= useState(true);
  const handleSubmit = async (e) =>{

    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/editor/sendEmail", {
        email: email,
        body: emailBody,
      });
      if(response.data==='done')
        {
          setIsDone(true)
        }
      setLoading(false);
    }
    catch (error) {
      console.error("Error sending data:", error);

    }
  }
  return (
    click &&
    <div onClick={() => { console.log("rr"); setClick(false); }} className='flex h-auto items-center  justify-center fixed inset-0 bg-opacity-75 bg-gray-800'>
    <main onClick={(e) => e.stopPropagation()} className='mt-5 bg-gradient-to-r from-blue-100 to-gray-200 shadow-lg rounded-lg w-1/2 py-8 px-6'>
        <h1 className='text-center text-3xl font-semibold text-gray-800 mb-6'>Send email to: {reviewer && reviewer.name}</h1>
        <form onSubmit={e => handleSubmit(e)} className='grid grid-cols-2 gap-4'>
            {isDone && <h1 className='col-span-2 flex justify-center items-center text-green-600 mb-4'>Email sent!</h1>}
            <label className='col-span-2 flex justify-center items-center text-gray-700 font-medium'>
                Email Body
            </label>
            <textarea onChange={e => setEmailBody(e.target.value)} value={text} placeholder="Write your review for the manuscript here"
                autoFocus
                className='bg-gray-50 col-span-2 text-gray-900 border-2 resize-none h-72 border-gray-400 rounded-md p-4'>
            </textarea>
            <div className='my-4 py-4 col-span-2 flex justify-center items-center space-x-4 rounded-md border-t border-gray-400'>
                <label className='text-gray-700 font-medium'>Email:</label>
                <input value={reviewer ? reviewer.email : ''} onChange={e => setEmail(e.target.value)} required className='border-2 border-gray-400 p-2 rounded-md text-gray-900' type='email' />
            </div>
            <div className='col-span-2 flex justify-center mt-6'>
                <button type='submit' className='text-xl bg-blue-600 text-white py-2 px-4 mb-4 rounded-lg shadow-md hover:bg-blue-500'>SUBMIT</button>
            </div>
        </form>
        {loading && <LoadingScreen />}
    </main>
</div>
  )
}


export default SendEmail