import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import BackToMenu from '../BackToMenu';
const text = `
<p>I hope this email finds you well.</p>
<p>
I am reaching out to you on behalf of Editorial Manager, a comprehensive platform designed to streamline the editorial process for academic and professional publishers. We are excited to invite you to join our platform as an editor and become part of our community of esteemed editorial professionals.
</p>
<p>
As an editor on Editorial Manager, you will have access to a range of powerful tools and features designed to simplify the submission, review, and publication process. Our platform offers:
</p>
<ul>
  <li>Submission Management: Easily submit, track, and manage manuscripts throughout the editorial workflow.</li>
  <li>Peer Review System: Facilitate the peer review process with customizable workflows and automated reminders.</li>
  <li>Editorial Dashboard: Gain insights into the editorial process with a user-friendly dashboard.</li>
  <li>Author and Reviewer Portals: Provide authors and reviewers with intuitive portals for manuscript management.</li>
  <li>Integration Capabilities: Seamlessly integrate with other systems and databases for efficient data sharing.</li>
</ul>
<p>
We believe that your expertise and experience would be invaluable in enhancing the quality and efficiency of our editorial processes. By joining Editorial Manager, you will have the opportunity to contribute to the advancement of scholarly research and academic publishing.
</p>
<p>
To register as an editor on Editorial Manager, simply click on the following link: [Registration Link]
</p>
<p>
If you have any questions or need assistance with the registration process, please do not hesitate to contact us. We are here to support you every step of the way.
</p>
<p>
Thank you for considering our invitation. We look forward to welcoming you to Editorial Manager and working together to achieve our shared goals.
</p>
<p>Best regards,</p>
<p>[Your Name]<br>[Your Position]<br>Editorial Manager</p>`
function AddEditor() {
  const [emailBody, setEmailBody] = useState(text);
  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/admin/addEditor", {
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
          <h1 className='text-center text-3xl font-semibold text-gray-800 mb-6'>Invitation for an Editor:</h1>
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

export default AddEditor