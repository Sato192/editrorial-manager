import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import BackToMenu from '../../BackToMenu';
import LoadingScreen from '../../LoadingScreen';
function SendEmail({id}) {
   const [manuscript, setmanuscript] = useState([]);
  useEffect(() => {
    const fetchDataByid = async () => {
      try {
        const response = await axios.post(`http://localhost:3000/editor//getManuscriptById`,
          {
            id : id
          }
        );
        setmanuscript(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchDataByid();
  }, []);
  const text=`
<p>Dear [Reviewer’s Name],</p>

<p>I hope this message finds you well.</p>

<p>We are pleased to inform you that you have been selected to review a manuscript titled “<strong>${manuscript.title}</strong>” for [Journal/Conference Name]. Your expertise in [relevant field/subject area] makes you an ideal candidate for this task.</p>

<p><strong>Manuscript Details:</strong></p>
<ul>
    <li><strong>${manuscript.title}:</strong> [Manuscript Title]</li>
    <li><strong>${manuscript.abstarct}:</strong> [Brief Abstract]</li>
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
        navigateTo(0);
      }, 500);
       
    }
    catch (error) {
      console.error("Error sending data:", error);

    }
  }
  return (
    click && 
    <div onClick={() => setClick(!click)} className='flex h-auto items-center justify-center fixed inset-0 bg-opacity-75 bg-gray-900'>
      <main onClick={(e) => e.stopPropagation()} className='mt-5 bg-indigo-100 shadow-md rounded-md w-1/2 py-5 px-10'>
        <h1 className='text-center font-bold text-gray-800 mb-4'>Assign a Reviewer for: {manuscript.title}, who is not registered in Editorial Manager</h1>
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


const ReviewCard = ({ review }) => {
  return (
    <div className="shadow-md rounded-lg p-4 ring-1 mb-4 bg-gradient-to-r from-blue-50 to-white">
  <h2 className={`text-2xl font-semibold ${(review.status==="Rejected") && 'text-red-500'} ${(review.status==="Accepted") && 'text-green-500'} ${(review.status==="Major revision") && 'text-orange-500'} ${(review.status==="Minor revision") && 'text-yellow-500'}  `}>{review.status}</h2>
  <p className="text-gray-600 text-sm">Manuscript: {review.manuscript.title} - Reviewed on {review.reviewDate} by {review.reviewer}</p>
  <hr className="my-2 border-t border-gray-300" />
  <p className="text-gray-600 mt-3 underline">Review:</p>
  <p className="mt-2 text-gray-800 bg-white p-4 border-l-2 whitespace-pre-wrap border-black">{review.review}</p>
</div>
  );
};

const SeeReviews = () => {
  const {manuscriptId}= useParams();
  const [email,setEmail]=useState(false);

  const [reviews,setReviews]= useState();
  const [loading,setLoading]= useState(true);
  useEffect(()=>{
    const getReviews = async ()=>{
      try{
        const response = await axios.get(`http://localhost:3000/editor/getReviews/${manuscriptId}`)
        setReviews(response.data);
        console.log(response.data);
        setLoading(false)
      }
      catch(error)
      {
        console.log(error);
      }
    }
    getReviews();
  },[])
  return (
    <div className="container mx-auto p-4">
              {email && <SendEmail id={manuscriptId} />}
       <div className=' flex justify-center items-center'>
        <button
                className="p-2 text-gray-950 bg-yellow-300 hover:bg-yello-100 rounded-md font-medium"

                onClick ={()=>setEmail(!email)}> Invite Reviewer via email </button>
        </div>
      {loading && <LoadingScreen/>}
      <div className='py-6 -ml-7 '>
      <BackToMenu href={'/editor/submissionsUnderReview'}>Previous Page</BackToMenu>
      </div>
   
      <h1 className="text-3xl bg-gradient-to-r from-yellow-50 to-white py-3 px-4 text-center font-bold mb-6">
  Reviews For '{ reviews && reviews.length>0 && reviews[0].manuscript.title}'
</h1>      {reviews && reviews.map(review => (
        <ReviewCard key={review._id} review={review} />
      ))}
      {
        reviews && reviews.length === 0 && <h1 className='text-2xl font-bold text-center m-6'>No reviews yet</h1>      }
        <div className=' flex justify-center items-center'>
        <a 
                className="p-2 text-gray-950 bg-blue-300 hover:bg-blue-100 rounded-md font-medium"

           href={"/editor/sendToAuthor/"+(manuscriptId)}> Send Back to Author </a>
        </div>
   
    </div>
  );
};

export default SeeReviews;
