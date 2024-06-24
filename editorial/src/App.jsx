import { BrowserRouter as Router, Route, Routes ,useNavigate, Outlet } from "react-router-dom";

import React, { useState , useEffect} from "react";
import LoginRegister from "./components/LoginRegister.jsx";
import AuthorPage from "./pages/AuthorPage.jsx";
import EditorPage from "./pages/EditorPage.jsx";
import Navbar from "./components/Navbar.jsx";
import TrackManuscript from "./components/Author/TrackManuscript.jsx";
import SubmitManuscript from "./components/Author/SubmitManuscript.jsx";
import ShowManuscripts from "./components/Editor/ShowManuscripts.jsx";
import Detailpage from "./components/Editor/EditorAction/Detailpage.jsx";
import AssignReviewer from "./components/Editor/EditorAction/AssignReviewer.jsx"
import ReviewrPage from "./pages/ReviewrPaga.jsx";
import ReviewerPage from "./pages/ٌReviewerPage.jsx";
import axios from "axios";
import AdminPage from "./pages/AdminPage.jsx";
import AddEditor from "./components/Admin/AddEditor.jsx";
import AddReviewr from "./components/Admin/AddReviewr.jsx";
import DeleteAuthor from "./components/Admin/DeleteAuthor.jsx";
import DeleteEditor from "./components/Admin/DeleteEditor.jsx";
import DeleteReviewr from "./components/Admin/DeleteReviewr.jsx";
import About from "./pages/About.jsx";
import EditorRegister from "./pages/EditorRegister.jsx";
import ReviewrRegister from "./pages/ReviewrRegister.jsx";
import NotFound from './pages/NotFound.jsx';
import LoginBar from "./components/LoginBar.jsx";
import Assignments from "./components/Editor/Assignments.jsx";
import AssignEditor from "./components/Editor/EditorAction/AssignEditor.jsx";
import BacktoAuthor from "./components/Editor/EditorAction/BacktoAuthor.jsx";
import SubmissionsUnderReview from "./components/Editor/SubmissionsUnderReview.jsx";
import ReviewerNoResponse from "./components/Editor/ReviewerNoResponse.jsx";
import AssignmentsReviesedSubmission from "./components/Editor/AssignmentsReviesedSubmission.jsx";
import SubmissionBackToAuthor from "./components/Editor/SubmissionBackToAuthor.jsx";
import SubmissionReqReviewComplete from "./components/Editor/SubmissionReqReviewComplete.jsx";
import SubmissionsReqAdditionalRevs from "./components/Editor/SubmissionsReqAdditionalRevs.jsx";
import SubmissionsLateRevs from "./components/Editor/SubmissionsLateRevs.jsx";
import SeeReviews from "./components/Editor/EditorAction/SeeReviews.jsx";
import AssignedManuscripts from "./components/Reviewer/AssignedManuscripts.jsx";
import SubmitAReview from "./components/Reviewer/SubmitAReview.jsx";
import Completed from "./components/Reviewer/Completed.jsx";
import SumbissionsAccepted from "./components/Author/SumbissionsAccepted.jsx";
import SubmissionNeedingRevisions from "./components/Author/SubmissionNeedingRevisions.jsx";
import RevisionSendBackToauthor  from "./components/Author/RevisionSendBackToauthor.jsx";
import RevisionsBeingProcced   from "./components/Author/RevisionsBeingProcced.jsx";
import Journal from "./pages/Journal.jsx";
const App = () => {
  return (
    <>
      <div className="font-medium bg-white ">
      <Router>
      <Navbar />
        <Routes>
          
          <Route element={<LoginRoutes />}>
          <Route  path="/" element={<LoginRegister />} />
          <Route path="editorReg" element={<EditorRegister/>}/>
          <Route path="reviewrReg" element={<ReviewrRegister/>}/>
          </Route>
          <Route element={<AuthorRoutes/>}>
          <Route path="/author">
            <Route index element={<AuthorPage  />} />
            <Route path="submitManuscript" element={<SubmitManuscript />} />
            <Route path="trackManuscript" element={<TrackManuscript />} />
            <Route path="trackManuscript/:manuscriptId" element={<Detailpage />} />
            <Route path="SubmissionsNeedingRevisions" element={<SubmissionNeedingRevisions />} />
            <Route path="RevisionSendBackToauthor" element={< RevisionSendBackToauthor/>} />
            <Route path="RevisionsBeingProcced" element={<RevisionsBeingProcced />} />
            <Route path="SumbissionsAccepted" element={<SumbissionsAccepted />} />
          </Route>
          </Route>
          <Route element={<ReviewrRoutes/>} >
          <Route path="/reviewer">
          <Route path="manuscripts" element={<AssignedManuscripts />} />
          <Route path="reviewed" element={<Completed />} />
          <Route path="manuscripts/submitReview/:manuscriptId" element={<SubmitAReview />} />

            <Route index element={<ReviewerPage />} />
          </Route>
          </Route>
          <Route  element={<EditorRoutes />} >
          <Route path="/editor">
            <Route index element={<EditorPage />} />
            <Route path="showManuscript" element={<ShowManuscripts />} />
            <Route path="showAuthors" element={<TrackManuscript />} />
            <Route path="Assignments" element={<Assignments/>} />
            <Route path="submissionsUnderReview" element={<SubmissionsUnderReview/>} />
            <Route path="submissionsUnderReview/:manuscriptId" element={<SeeReviews/>} />
            <Route path="reviewNoResopnse" element={<ReviewerNoResponse/>} />
            <Route path="revisedSubsReqAssignments" element={<AssignmentsReviesedSubmission/>} />
            <Route path="SubsSendBackToAuth" element={<SubmissionBackToAuthor/>} />
            <Route path="SubmissionReqReviewComplet" element={<SubmissionReqReviewComplete/>} />
            <Route path="SubmissionReqAdditionRevs" element={<SubmissionsReqAdditionalRevs/>} />
            <Route path="LateRevsSubmissions" element={<SubmissionsLateRevs/>} />
            <Route path="sendToAuthor/:manuscriptId" element={<BacktoAuthor/>} />
            <Route path="AssignEditor/:manuscriptId" element={<AssignEditor/>} />
            <Route path="showManuscript/:manuscriptId" element={<Detailpage />} />
            <Route path="AssignReveiwer/:manuscriptId" element={<AssignReviewer />} />
            
          </Route>
          </Route>
          <Route  element={<AdminRoutes />} >
          <Route path="/admin">
            <Route index element={<AdminPage />} />
            <Route path="addReviewr" element={<AddReviewr/>} />
            <Route path="deleteReviewr" element={<DeleteReviewr/>} />
            <Route path="AddEditor" element={<AddEditor/>} />
            <Route path="deleteEditor" element={<DeleteEditor/>} />
            <Route path="deleteAuthor" element={<DeleteAuthor/>} />
          </Route>
          </Route>
          
          <Route path="/about" element={<About/>}/>
          <Route path="/journal" element={<Journal/>}/>
          <Route path="reviewThis/:token"element={<ReviewrPage />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
          
      </Router>
      </div>
    </>
  );
};

const AuthorRoutes = ()=>{
  const [role,setRole]=useState('');
  const navigateTo = useNavigate();
  console.log(role);
  useEffect(() => {
    axios.get('http://localhost:3000/test2')
  .then(res =>{
    console.log(res.data);
    setRole(res.data);
    if (res.data !== "author") {
      navigateTo('/');
    }
  })
  .catch(error=>{
    console.log(error);
  })
  }, []);
  return (
    role==="author" ?  <Outlet/> : null 
  )
}
const EditorRoutes = ()=>{
  const [role,setRole]=useState('');
  const navigateTo = useNavigate();
  console.log(role);
  useEffect(() => {
    axios.get('http://localhost:3000/test2')
  .then(res =>{
    console.log(res.data);
    setRole(res.data);
    if (res.data !== "editor") {
      navigateTo('/');
    }
  })
  .catch(error=>{
    console.log(error);
  })
  }, []);
  return (
    role==="editor" ?  <Outlet/> : null 
  )
}
const ReviewrRoutes = ()=>{
  const [role,setRole]=useState('');
  const navigateTo = useNavigate();
  console.log(role);
  useEffect(() => {
    axios.get('http://localhost:3000/test2')
  .then(res =>{
    console.log(res.data);
    setRole(res.data);
    if (res.data !== "reviewer") {
      navigateTo('/');
    }
  })
  .catch(error=>{
    console.log(error);
  })
  }, []);
  return (
    role==="reviewer" ?  <Outlet/> : null 
  )
}
const LoginRoutes = () =>{
  const [role,setRole]=useState(null);
  const navigateTo = useNavigate();
  const [wating,setWating]= useState(true);
  console.log(role);
  useEffect(() => {
    axios.get('http://localhost:3000/test2')
  .then(res =>{
    console.log(res.data);
    setRole(res.data);

    if (res.data === "author") {
      navigateTo('/author');
    }else if (res.data === "editor") {
      navigateTo('/editor');
    }else if (res.data === "reviewer") {
      navigateTo('/reviewer');
    }else if (res.data === "admin") {
      navigateTo('/admin');
    }
    setWating(false);
  })
  .catch(error=>{
    console.log(error);
  })
  }, []);
  return (
  !wating &&  ( !role ?  <Outlet/> : null)
  )
}

const AdminRoutes = ()=>{
  const [role,setRole]=useState('');
  const navigateTo = useNavigate();
  console.log(role);
  useEffect(() => {
    axios.get('http://localhost:3000/test2')
  .then(res =>{
    console.log(res.data);
    setRole(res.data);
    if (res.data !== "admin") {
      navigateTo('/');
    }
  })
  .catch(error=>{
    console.log(error);
  })
  }, []);
  return (
    role==="admin" ?  <Outlet/> : null 
  )
}

export default App;
