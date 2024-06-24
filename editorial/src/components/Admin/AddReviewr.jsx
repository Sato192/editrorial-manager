import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import BackToMenu from '../BackToMenu';
const text=`
<p>I hope this message finds you well.</p>

<p>
I am reaching out to you on behalf of Editorial Manager, a comprehensive platform designed to streamline the editorial process for academic and professional publishers. We are excited to invite you to join our platform as a reviewer and become part of our community of esteemed editorial professionals.
</p>

<p>
As a reviewer on Editorial Manager, you will have access to a range of powerful tools and features designed to simplify the review process. Our platform offers:
</p>

<ul>
  <li>Easy manuscript access and submission for review</li>
  <li>Customizable review workflows</li>
  <li>Automated reminders and notifications</li>
  <li>Author and editor communication tools</li>
  <li>Integration capabilities with other systems</li>
</ul>

<p>
Your expertise and experience in your field would be invaluable in enhancing the quality and efficiency of our review processes. By joining Editorial Manager, you will have the opportunity to contribute to the advancement of scholarly research and academic publishing.
</p>

<p>
To register as a reviewer on Editorial Manager, simply click on the following link: [Registration Link]
</p>

<p>
If you have any questions or need assistance with the registration process, please do not hesitate to contact us. We are here to support you every step of the way.
</p>

<p>
Thank you for considering our invitation. We look forward to welcoming you to Editorial Manager and working together to achieve our shared goals.
</p>

<p>Best regards,<br>
[Your Name]<br>
[Your Position]<br>
Editorial Manager</p>`
function AddReviewer() {
  
  const [emailBody,setEmailBody]= useState(text);
  const [email,setEmail]= useState("");
  const handleSubmit = async () =>{
    try {
      const response = await axios.post("http://localhost:3000/admin/addReviewr", {
        email: email,
        body: emailBody,
      });
    }
    catch (error) {
      console.error("Error sending data:", error);
    }
  }
  return (
    <div className='bg-gray-100'>
            <BackToMenu>Previous</BackToMenu>

    <div className='flex h-auto items-center justify-center  min-h-screen'>
      
  <main className='mt-5 bg-gradient-to-r from-blue-50 to-gray-200 shadow-lg rounded-lg w-1/2 py-8 px-6'>
    <h1 className='text-center text-3xl font-semibold text-gray-800 mb-6'>Invitation for a Reviewer:</h1>
    <form className='grid grid-cols-2 gap-4'>
      <label className='col-span-2 flex justify-center items-center text-gray-700 font-medium'>
        Email Body
      </label>
      <textarea
        onChange={e => setEmailBody(e.target.value)}
        value={text}
        placeholder="Write your invitation for the editor here"
        autoFocus
        className='bg-gray-50 col-span-2 text-gray-900 border-2 border-gray-400 resize-none h-72 rounded-md p-4'
      ></textarea>
      <div className='my-4 py-4 col-span-2 flex justify-center items-center space-x-4 rounded-md border-t border-gray-400'>
        <label className='text-gray-700 font-medium'>Email:</label>
        <input
          onChange={e => setEmail(e.target.value)}
          required
          className='border-2 border-gray-400 p-2 rounded-md text-gray-900 w-full'
          type='email'
        />
      </div>
      <div className='col-span-2 flex justify-center mt-6'>
        <button onClick={handleSubmit} className='text-xl bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-500'>
          SUBMIT
        </button>
      </div>
    </form>
  </main>
</div>
</div>
  )
}

export default AddReviewer;