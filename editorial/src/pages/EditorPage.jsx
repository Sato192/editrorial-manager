
import Section from "../components/Section";
import Choise  from "../components/Choise";
import LoginBar from "../components/LoginBar";
import { useEffect ,useState} from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa6";

import axios from "axios";

const EditorPage = () => {
  const [bar,setBar]=useState(true);
  const [bar1,setBar1]=useState(true);
const [notification,setNotification]= useState(null);
useEffect(()=>{
  const getNotification = async ()=>{
    try{
      const response = await axios.get("http://localhost:3000/editor/getNotification");
      console.log(response.data)
      setNotification(response.data);
    }
    catch(error){
      console.log(error);
    }
  }
  getNotification();
},[])

  return (
    <>
   <LoginBar/>
    <div className=" mt-6 grid grid-cols-1  z-40 ">
        <div className=" self-start  grid grid-cols-1 items-start  border-b mx-32 rounded-lg my-5" >
          <div onClick={()=>setBar(!bar)} className="px-16 py-4 flex justify-center bg-blue-100 items-center rounded-full  text-fuchsia-500 text-center text-2xl">
           <p className="text-purple-800 cursor-pointer hover:scale-110 hover:text-purple-400 px-7 ">Pending Assignments</p>   {!bar ? <FaCaretUp /> : <FaCaretDown /> }</div>
          {!bar &&
        <div className="space-y-2 shadow-md grid grid-cols-1 items-start  bg-blue-50 mx-48 border-b m-11">
      { notification && notification.admin && <Choise href={"editor/ShowManuscript"}>New Submissions  
       <sup className=" z-auto ml-2 text-sm text-red-500">{`(${notification.newSubmission})`} </sup>
        </Choise>}
      <Choise href={"editor/revisedSubsReqAssignments"}>Revised Submissions Requiring Assignment
      <sup className="ml-2 text-sm text-red-500">{notification && `(${notification.revisedSubmissionsReqAssignmments})`} </sup>

      </Choise>
      <Choise href={"editor/SubsSendBackToAuth"}>Submissions Sent Back to Author for Approval
      <sup className="ml-2 text-sm text-red-500">{notification && `(${notification.SubmissionSendToAuthorForApproval})`} </sup>
      </Choise>
      <Choise href={"editor/Assignments"}>New Assignments
      <sup className="ml-2 text-sm text-red-500">{notification && `(${notification.NewAssignment})`} </sup>
      </Choise>
     
      <Choise href={"editor/LateRevsSubmissions"}>Submissions with One or More Late Reviews
      <sup className="ml-2 text-sm text-red-500">{notification && `(${notification.reviewerNoresponse})`} </sup>
      </Choise>
      <Choise href={"editor/trackmanuscript"}>Submissions with Active Discussions
      <sup className="ml-2 text-sm text-red-500">{notification && `(${notification.activeDiscussions})`} </sup>

      </Choise>
      </div>}
        </div>

        <div className="mx-32 self-start  grid grid-cols-1 items-start  border-b my-5" >
        <div onClick={()=>setBar1(!bar1)} className="px-16 py-4 flex justify-center bg-blue-100 rounded-full items-center  text-fuchsia-500 text-center text-2xl">
           <p className="text-purple-800  hover:scale-110 hover:text-purple-400 cursor-pointer px-7  ">Reviews in Progress</p>   {!bar1 ? <FaCaretUp /> : <FaCaretDown /> }</div>
          {!bar1 &&
        <div className="mx-48 space-y-2 shadow-md grid grid-cols-1 items-start bg-blue-50  border-b m-11">
     <Choise href={"editor/reviewNoResopnse"}>Reviewers Invited - No Response
       <sup className="ml-2 text-sm text-red-500">{notification && `(${notification.reviewerNoresponse})`} </sup>

       </Choise>
       <Choise href={"editor/submissionsUnderReview"}>Submissions Under Review
       <sup className="ml-2 text-sm text-red-500">{notification && `(${notification.SubmissionsUnderReview})`} </sup>
       </Choise>     
      </div>}
        </div>
       
  
    </div>
    
    
    </>
  );
};

export default EditorPage;
