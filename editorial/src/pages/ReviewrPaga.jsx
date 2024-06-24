import React from 'react'
import LoginBar from '../components/LoginBar'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ReviewrPaga() {
    const { token } = useParams();
    const [manuscript, setmanuscript] = useState([]);
    const [status, setStatus] = useState();
    const [review, setReview] = useState();
    const [name, setName] = useState();
    const navigateTo = useNavigate();
    useEffect(() => {
        const fetchDataByToken = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/auth/review/${token}`);
                console.log(response.data)
                if (response.data === 'error') {
                    navigateTo('/');
                }
                setmanuscript(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchDataByToken();
    }, []);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/reviewer/review',
                {
                    manuscript: manuscript._id,
                    status: status,
                    review: review,
                    name: name,
                    token: token
                }
            )
        }
        catch (error) {
            console.log(error)
        }
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
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
            <main className="w-full max-w-4xl mt-5 bg-gradient-to-r from-gray-200 via-slate-200 to-gray-200 shadow-md ring-1 ring-black rounded-md py-5 px-6">
                <h1 className="text-center text-2xl font-medium mb-6">
                    Revision for: {manuscript.title}
                </h1>
                <div className='flex justify-center my-3'>
                    <button onClick={()=>handleDownload(manuscript.filePath,manuscript.title)}
                    className='bg-blue-500 text-white  rounded-lg shadow-md p-2 hover:bg-blue-700 transition duration-300'>Download Manuscript</button>
                </div>
                <form className="grid grid-cols-1 gap-4">
                    <label className="flex justify-center items-center font-semibold">
                        Reviewer's Note:
                    </label>
                    <textarea
                        onChange={e => setReview(e.target.value)}
                        placeholder="Write your review for the manuscript here"
                        autoFocus
                        className="bg-slate-50 text-purple-950 border-2 border-black rounded-md p-3 resize-none h-72"
                    >
                    </textarea>

                    <div className="flex flex-wrap justify-between items-center py-2 px-3 border border-purple-900 rounded-md">
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

                  <div className="grid grid-cols-2  items-center m-auto space-y-2">
    <label htmlFor="reviewer_name">Your Name:</label>
    <input
      id="reviewer_name"
      className="ring-1 ring-black p-2 rounded-md"
      type="text"
      placeholder="Enter your name here"
      required
      onChange={(e) => setName(e.target.value)}
    />

    <label htmlFor="linkedin">LinkedIn Profile:</label>
    <input
      id="linkedin"
      className="ring-1 ring-black p-2 rounded-md"
      type="text"
      placeholder="Enter your LinkedIn profile link here"
      onChange={(e) => setLinkedIn(e.target.value)}
    />

    <label htmlFor="orcid">ORCID iD:</label>
    <input
      id="orcid"
      className="ring-1 ring-black p-2 rounded-md"
      type="text"
      placeholder="Enter your ORCID iD here"
      onChange={(e) => setOrcid(e.target.value)}
    />
</div>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleSubmit}
                            className="text-2xl bg-purple-950 text-white p-3 rounded-lg shadow-md hover:bg-purple-700 transition-colors"
                        >
                            SUBMIT
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default ReviewrPaga