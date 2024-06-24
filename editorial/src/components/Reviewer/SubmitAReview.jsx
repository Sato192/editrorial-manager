import React from 'react'
import { useParams } from "react-router-dom";
import { useState , useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackToMenu from '../BackToMenu';
import LoadingScreen from '../LoadingScreen.jsx'

function SubmitAReview() {
    const { manuscriptId } = useParams();
    const [manuscript, setmanuscript] = useState([]);
    const [status, setStatus]= useState();
    const [review,setReview]= useState();
    const [name,setName]=useState();
    const [loading,setLoading]=useState(false);
    const navigateTo = useNavigate();
    useEffect(() => {
        const fetchDataByToken = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/reviewer/getbyId/${manuscriptId}`);
            if (response.data === 'error')
                {
                    navigateTo('/');
                }
            setmanuscript(response.data);
          } catch (error) {
            console.error("Error fetching data: ", error);
          }
        };
    
        fetchDataByToken();
      }, []);
 
const handleSubmit = async (e)=>
  {
    setLoading(true)
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/reviewer/reviewWitoutToken' , 
        {
          manuscript : manuscript._id,
          status : status,
          review : review ,
          name: name 
        }
      )
      setLoading(false);
      console.log(response.data);
      navigateTo('/reviewer');
      console.log('grr')
    }
    catch(error)
    {
      console.log(error)
      navigateTo('/reviewer/manuscripts');

    }
  }

  return (
    <div className='pt-6 bg-gray-100'>
    <BackToMenu href={"/reviewer"}>Reviewers Menu</BackToMenu>
    {loading && <LoadingScreen/>}
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <main className="w-full max-w-3xl mt-5 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 shadow-md ring-1 ring-black rounded-md py-5 px-6">
            <h1 className="text-center text-3xl font-semibold mb-6">
                Revision for: {manuscript.title}
            </h1>
            <form className="grid grid-cols-1 gap-4">
                <label className="flex justify-center items-center font-semibold">
                    Reviewer's Note:
                </label>

                <textarea
                    required
                    onChange={e => setReview(e.target.value)}
                    placeholder="Write your review for the manuscript here"
                    autoFocus
                    className="bg-gray-50 text-gray-800 border-2 border-gray-500 rounded-md p-3 resize-none h-72"
                >
                </textarea>

                <div className="flex flex-wrap justify-between items-center py-2 px-3 border border-gray-500 rounded-md">
                    <div className="flex items-center space-x-2">
                        <input
                            onChange={e => setStatus('Accepted')}
                            id="accept"
                            className="hover:scale-110 transition-transform"
                            type="radio"
                            value="accept"
                            name="my_choice"
                        />
                        <label htmlFor="accept">Accept</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            onChange={e => setStatus('Rejected')}
                            id="reject"
                            className="hover:scale-110 transition-transform"
                            type="radio"
                            value="reject"
                            name="my_choice"
                        />
                        <label htmlFor="reject">Reject</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            onChange={e => setStatus('Minor revision')}
                            id="minor_revision"
                            className="hover:scale-110 transition-transform"
                            type="radio"
                            value="minor_revision"
                            name="my_choice"
                        />
                        <label htmlFor="minor_revision">Minor revision</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            onChange={e => setStatus('Major revision')}
                            id="major_revision"
                            className="hover:scale-110 transition-transform"
                            type="radio"
                            value="major_revision"
                            name="my_choice"
                        />
                        <label htmlFor="major_revision">Major revision</label>
                    </div>
                </div>

                <div className="flex justify-center items-center space-x-3">
                    <label htmlFor="reviewer_name">Your Name:</label>
                    <input
                        id="reviewer_name"
                        className="ring-1 ring-black p-2 rounded-md"
                        type="text"
                        placeholder="Enter your name here"
                        required
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className="flex justify-center mt-4">
                    <button
                        onClick={(e) => handleSubmit(e)}
                        className="text-2xl bg-blue-700 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                    >
                        SUBMIT
                    </button>
                </div>
            </form>
        </main>
    </div>
</div>
   
  )
}

export default SubmitAReview