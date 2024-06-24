import React from 'react'
import Section from "../components/Section";
import Choise from "../components/Choise";
import LoginBar from '../components/LoginBar';
import { useEffect ,useState} from "react";
import { useIsVisible } from "../components/useIsVisible";
import { useRef } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa6";
import axios from 'axios';
function ReviewerPage() {
  const [notification,setNotification]= useState(null);
  useEffect(()=>{
    const getNotification = async ()=>{
      try{
        const response = await axios.get("http://localhost:3000/reviewer/getNotification");
        console.log(response.data)
        setNotification(response.data);
      }
      catch(error){
        console.log(error);
      }
    }
    getNotification();
  },[])
  
  const [bar,setBar]=useState(true);
  return (
    <div>
      <LoginBar />
      <div className=" grid grid-cols-1 mt-6  ">

        <div className={` self-start  shadow-md grid grid-cols-1 items-start border-b mx-32 my-5`} >
          <div onClick={() => setBar(!bar)} className="px-16 py-4 flex justify-center rounded-full bg-blue-100 items-center  text-fuchsia-500 text-center text-2xl">
            <p className="text-purple-800 cursor-pointer  hover:scale-110 hover:text-purple-400 px-7  ">Manuscripts</p>   {!bar ? <FaCaretUp /> : <FaCaretDown />}</div>
          {!bar &&
            <div className="space-y-2 shadow-md grid grid-cols-1 items-start bg-blue-50 mx-48 border-b m-11">
              <Choise href={"reviewer/manuscripts"}>Assigned Manuscripts
              <sup className="ml-2 text-sm text-red-500">{notification && `(${notification.newSubmission})`} </sup>
              </Choise>

              <Choise href={"reviewer/reviewed"}>Manuscripts Reveiwerd
              <sup className="ml-2 text-sm text-red-500">{notification && `(${notification.completed})`} </sup>
              </Choise>


            </div>}
        </div>


      </div>

    </div>
  )
}

export default ReviewerPage