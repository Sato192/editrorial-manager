
import Section from "../components/Section";
import Choise from "../components/Choise";
import LoginBar from "../components/LoginBar";
import { useEffect, useState } from "react";
import { useIsVisible } from "../components/useIsVisible";
import { useRef } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa6";
import axios from "axios";

const AuthorPage = () => {
  const [bar, setBar] = useState(true);
  const [bar1, setBar1] = useState(true);
  const [bar2, setBar2] = useState(true);
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    const getNotification = async () => {
      try {
        const response = await axios.get("http://localhost:3000/author/getNotification");
        console.log(response.data)
        setNotification(response.data);
      }
      catch (error) {
        console.log(error);
      }
    }
    getNotification();
  }, [])

  return (
    <>
      <LoginBar />
      <div className="grid grid-cols-1 mt-6">
        {/* Submissions */}
        <div className="self-start shadow-lg grid grid-cols-1 items-start border-b mx-32 my-5">
          <div
            onClick={() => setBar(!bar)}
            className="px-16 py-4 flex rounded-full justify-center bg-blue-100 items-center text-fuchsia-500 text-center text-2xl cursor-pointer transition-transform duration-300"
          >
            <p className="text-purple-800 hover:scale-110 hover:text-purple-400 px-7">Submission</p>
            {!bar ? <FaCaretUp /> : <FaCaretDown />}
          </div>
          {!bar && (
            <div className="space-y-2 shadow-md grid grid-cols-1 items-start bg-blue-50 mx-48 border-b my-5 transition-all duration-500 ease-in-out">
              <Choise href={"author/submitmanuscript"}>Submit Your Manuscript</Choise>
              <Choise href={"author/trackmanuscript"}>
                Track Submitted Manuscripts
                <sup className="ml-2 text-sm text-red-500">{notification && `(${notification.trackmanuscript})`}</sup>
              </Choise>
            </div>
          )}
        </div>

        {/* Revisions */}
        <div className="self-start shadow-lg grid grid-cols-1 items-start border-b mx-32 my-5">
          <div
            onClick={() => setBar1(!bar1)}
            className="px-16 py-4 flex rounded-full justify-center bg-blue-100 items-center text-fuchsia-500 text-center text-2xl cursor-pointer transition-transform duration-300"
          >
            <p className="text-purple-800 hover:scale-110 hover:text-purple-400 px-7">Revisions</p>
            {!bar1 ? <FaCaretUp /> : <FaCaretDown />}
          </div>
          {!bar1 && (
            <div className="space-y-2 shadow-md grid grid-cols-1 items-start bg-blue-50 mx-48 border-b my-5 transition-all duration-500 ease-in-out">
              <Choise href={"author/SubmissionsNeedingRevisions"}>Submission needing revisions
                <sup className="ml-2 text-sm text-red-500">{notification && `(${notification.SubsNeedingRevisions})`}</sup>
              </Choise>
              <Choise href={"author/RevisionSendBackToauthor"}>Revisions sent back to author
              <sup className="ml-2 text-sm text-red-500">{notification && `(${notification.backToAuthor})`}</sup>
</Choise>
              <Choise href={"author/RevisionsBeingProcced"}>Revisions being processed
                <sup className="ml-2 text-sm text-red-500">{notification && `(${notification.RevisionsBeignProceced})`}</sup>

              </Choise>
            </div>
          )}
        </div>

        {/* Completed */}
        <div className="self-start shadow-lg grid grid-cols-1 items-start border-b mx-32 my-5">
          <div
            onClick={() => setBar2(!bar2)}
            className="px-16 py-4 flex rounded-full justify-center bg-blue-100 items-center text-fuchsia-500 text-center text-2xl cursor-pointer transition-transform duration-300"
          >
            <p className="text-purple-800 hover:scale-110 hover:text-purple-400 px-7">Completed</p>
            {!bar2 ? <FaCaretUp /> : <FaCaretDown />}
          </div>
          {!bar2 && (
            <div className="space-y-2 shadow-md grid grid-cols-1 items-start bg-blue-50 mx-48 border-b my-5 transition-all duration-500 ease-in-out">
              <Choise href={"author/SumbissionsAccepted"}>Submission Accepted
              <sup className="ml-2 text-sm text-red-500">{notification && `(${notification.completed})`}</sup>

              </Choise>
            </div>
          )}
        </div>
      </div>

    </>
  );
};

export default AuthorPage;
