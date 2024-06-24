import React, { Children } from 'react'
import { useParams } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageIterate from '../../PageIterate';
import { useEffect } from 'react';
import axios from 'axios';
import SendEmail from "./SendEmail";
import LoadingScreen from '../../LoadingScreen';
import BackToMenu from '../../BackToMenu';

function TableElement({ children }) {
    return (
        <td
            className={
                "text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal"
            }
        >
            {children}
        </td>
    )
}

function TableHeader({ children }) {
    return (
        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            {children}
        </th>
    )

}

function MyButton({ action, children }) {
    return (
        <button className="bg-blue-300 px-3 py-1 hover:bg-blue-200 rounded-md" onClick={action} >{children}</button>
    )
}

function ManuscriptTitle({manuscript}) {
   
    return (
        <div className=' pt-2 px-3 '>
            <BackToMenu>Previous</BackToMenu>
            <h1 className=' flex justify-center  text-center text-2xl  '>
                <span className='inline-block  bg-slate-50 font-serif rounded-sm'> Assigning reviewers for manuscript :{manuscript && manuscript.title} </span>
            </h1>
            <div>

            </div>

        </div>
    )
}

function FilterTable() {
    return (
        <div className='flex justify-center space-x-4 py-2 '>
            <select className='bg-gray-100 border border-black rounded-md' name="filter" id="reviewerfilter">
                <option value="option1">option1</option>
                <option value="option2">option2</option>
                <option value="option3">option3</option>
                <option value="option4">option4</option>
            </select>
            <MyButton> fliter</MyButton>

        </div>
    )
}

function ReviewersTable({ data, setReviewersAssigned }) {
    const [currentData, setCurrentData] = useState([]);
    const[reviewers,setReviewrs]=useState([]);
    useEffect(()=>{
        setReviewrs(data);
    },[data])
    function getCurrentData(dataformChild) {
        setCurrentData(dataformChild);
    }
    function handleReviewAssigned(id) {
        console.log(id);
        setReviewersAssigned(currentData.find(obj=>obj._id==id));
    }
    return (
        <div className='mt-2 p-3 border shadow-sm'>
            <PageIterate data={reviewers} dataSlice={getCurrentData} numberOfPages={4} />
            <table className={" shadow-md border m-auto rounded-lg mt-2 min-w-full "}>
                <thead className="bg-slate-300 border-b border-black">
                    <tr>
                        <TableHeader>index</TableHeader>
                        <TableHeader>Name</TableHeader>
                        <TableHeader>Email:</TableHeader>
                        <TableHeader>Reviews Completed</TableHeader>
                        <TableHeader>reviews in progress</TableHeader>
                        <TableHeader>take action</TableHeader>

                    </tr>

                </thead>
                <tbody>
                    {currentData && currentData.map((reviewer, index) => (
                        <tr key={index}
                            className={
                                " border-b transition duration-300 ease-in-out " +
                                (Number(index) % 2 != 0
                                    ? "bg-white hover:bg-gray-300"
                                    : "bg-blue-100-100 hover:bg-gray-300")
                            }>
                            <TableElement>{index+1}</TableElement>
                            <TableElement>{reviewer.name}</TableElement>
                            <TableElement>{reviewer.email}</TableElement>
                            <TableElement>{reviewer.completed.length}</TableElement>
                            <TableElement>{reviewer.manuscripts.length}</TableElement>
                            <TableElement><MyButton action={() => { handleReviewAssigned(reviewer._id) }}>Assign</MyButton></TableElement>

                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )

}

function ReviewersAssigned({ data }) {
    const [reviewer,setReviewer] = useState(null);
    const [assignReveiwers,setAssignReveiwers]=useState([]);
    const [email,setEmail]=useState(false);
    useEffect (()=>{
        setAssignReveiwers(data);
    })
    const handleSendEmail = (id)=>{
            setEmail(!email)
            setReviewer( assignReveiwers.find(reviewer => id===reviewer._id))
    }
    return (
        <div  className='mt-2 p-3 border shadow-sm'>
                 { email &&

                   <SendEmail  reviewer={reviewer} />  
                 }

            <h1 className=' mt-2 flex justify-center  text-center text-2xl my-2  '>
                <span className=' text-red-700 font-bold shadow-sm text-clip font-serif rounded-sm'> The primarly reviewers You Assing</span>
            </h1>
            <table className={" shadow-md border m-auto rounded-lg mt-2 bg-gradient-to-b from-blue-100 to-white "}>
                <thead className="bg-slate-300 border-b border-black">
               <tr>
                   <TableHeader>Name</TableHeader>
                   <TableHeader>email</TableHeader>
                   <TableHeader>reviews in progress</TableHeader>
                   <TableHeader>send Email</TableHeader>

               </tr>

           </thead>
                <tbody>
                    {assignReveiwers && assignReveiwers.map((reviewer, index) => (
                        <tr key={index}  className={
                            " border-b transition duration-300 ease-in " +
                            (Number(index) % 2 != 0
                                ? "bg-white hover:bg-gray-300"
                                : "bg-red-50 hover:bg-gray-300")
                        }>
                            <TableElement>{reviewer.name}</TableElement>
                            <TableElement>{reviewer.email}</TableElement>
                            <TableElement>{reviewer.manuscripts.length}</TableElement>
                            <TableElement><button onClick={()=>handleSendEmail(reviewer._id)} className="bg-yellow-300 px-3 py-1 hover:bg-yellow-200 rounded-md"  >Send Email</button></TableElement>

                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}


function AssignReviewer() {
    const { manuscriptId } = useParams();
    const [reviewersAssigned, setReviewersAssigned] = useState([]);
    const [reviewrs,setReviewrs] = useState([]);
    const [manuscript,setManuscript]= useState(null);
    const [loading,setLoading]=useState(false);
    const [due,setDue]= useState(null);
    useEffect(()=>{
        const getReviewres = async ()=>{
            try{
                const response = await axios.get(`http://localhost:3000/editor/getReviewers?id=${manuscriptId}`)
                const response2 = await axios.post(`http://localhost:3000/editor/getManuscriptById`,
                {
                    id : manuscriptId,
                }
            )
                setReviewrs(response.data);
                setManuscript(response2.data);
                set
                console.log(response.data);
            }
            catch(error)
            {
                console.log(error);
            }
        }
        getReviewres();
    },[])
    function getreviewersAssigned(obj)
    {
        console.log(obj);
        setReviewersAssigned(prev=>[...prev,obj]);
        const updatedReviewrs = reviewrs.filter(rev=>rev!=obj)
        setReviewrs(updatedReviewrs);
        console.log(reviewrs);
    }
    const navigateTo = useNavigate();
    const sendReviewers = async ()=>{
        setLoading(true);
        try{
            const response = await axios.post('http://localhost:3000/editor/AssignReviewers',
            {
                due: due,
                id : manuscriptId,
                reviewers : reviewersAssigned
            }
        )
        setLoading(false);
        navigateTo('/editor');
        }
        catch{(error => console.log(error))}
        
    }
    return (
        <div className='bg-gradient-to-b from-slate-50 via-gray-100 to-blue-50 mb-4 pb-5'>
            {loading && <LoadingScreen/>}
            <ManuscriptTitle manuscript={manuscript} />
          { reviewrs && reviewrs.length !=0 &&  <ReviewersTable data={reviewrs} setReviewersAssigned={getreviewersAssigned} />}
          { reviewersAssigned.length!=0 &&
           <div>

          
             <ReviewersAssigned data={reviewersAssigned} /></div>
          }
         { reviewersAssigned.length!=0 && <center>
            <div className='flex justify-center items-center space-x-3 p-2 mb-5  bg-red-100'>
         <h1 className='text-red-900 font-extrabold '> Due Time:</h1>  <input required onChange={(e)=>setDue(e.target.value)} className='mx-2 p-2' type='date'></input>
            </div> 
        <button
         className='bg-blue-300 px-3 py-1 hover:bg-blue-200 rounded-md'
         onClick={sendReviewers}> <b>CONFIRM</b> </button></center>}
        </div>
    )
}

export default AssignReviewer