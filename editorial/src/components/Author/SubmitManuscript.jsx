import axios from "axios";
import { useState } from "react";
import BackToMenu from "../BackToMenu";
import LoadingScreen from "../LoadingScreen";

function SubmitManuscript() {

  const [loading,setLoading]= useState(false);
  const [manuscriptTitle,setManuscriptTitle]= useState("");
  const [manuscriptType,setmanuscriptType]= useState("");
  const [abstract,setAbstarct]= useState("");
  const [affiliation,setAffiliation]= useState("");
  const [coAuthor,setCoAuthor]= useState("");
  const [isPosting,setIsPosting]= useState(false);
  const [isDone,setIsDone]= useState(false);
  const [file,setFile]=useState(null);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', manuscriptTitle);
    formData.append('type', manuscriptType);
    formData.append('abstract', abstract);
    formData.append('affiliation', affiliation);
    formData.append('coAuthor', coAuthor);
    
    try {
      const response = await axios.post('http://localhost:3000/author',formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if(response.data==='done')
        {
          setLoading(false);
          setIsDone(true);
        }
    } catch (error) {
      console.error('Error sending data:', error);
    }
    e.target.reset();

  }
  return ( 
     <>
   <div className="flex items-start bg-slate-100 min-h-screen p-10">
      {loading && <LoadingScreen />}
      <BackToMenu href="/author">Author Menu</BackToMenu>
      <form onSubmit={handleSubmit} method="post" className="grid grid-cols-2 gap-6 p-8 bg-white shadow-md rounded-lg m-auto w-3/5">
        <h1 className="text-2xl col-span-2 underline underline-offset-2 text-center mb-4">Manuscript Informations :</h1>
        <p className="col-span-2 font-light mb-4 bg-red-100 text-red-800 p-4 border-l-4 border-red-500">
  <strong>Note:</strong> This file must be anonymized. Remove all author names, affiliations, and acknowledgments that could reveal your identity.
</p>
        <label htmlFor="manuscript_submission" className="">Submit your manuscript</label>
        <input 
        accept="application/pdf,application" 
          onChange={e => setFile(e.target.files[0])} 
          type="file" 
          name="manuscript_submission" 
          className=" px-4 py-2 border border-gray-900 rounded-lg cursor-pointer hover:bg-gray-100"
        />
        <label htmlFor="manuscript_title" className="">Title of  manuscript :</label>
        <input 
          onChange={e => setManuscriptTitle(e.target.value)} 
          className=" px-4 py-2 border border-gray-900 rounded-lg" 
          type="text" 
          name="manuscript_title" 
        />
        <label htmlFor="manuscript_type" className="">Type Of Manuscript :</label>
        <input 
          onChange={e => setmanuscriptType(e.target.value)} 
          className=" px-4 py-2 border border-gray-900 rounded-lg" 
          type="text" 
          name="manuscript_type" 
        />
        <label htmlFor="abstract" className="">Abstract :</label>
        <textarea 
          onChange={e => setAbstarct(e.target.value)} 
          maxLength="500" 
          name="abstract" 
          className=" resize-none h-32 px-4 py-2 border border-gray-900 rounded-lg" 
        />
        <h1 className="text-2xl col-span-2 underline underline-offset-2 text-center mt-6 mb-4">Author information: :</h1>
        <label htmlFor="affiliation" className="">Affiliation :</label>
        <input 
          onChange={e => setAffiliation(e.target.value)} 
          className=" px-4 py-2 border border-gray-900 rounded-lg" 
          type="text" 
          name="affiliation" 
        />
        <label htmlFor="co_author" className="">Co-auteur :</label>
        <input 
          onChange={e => setCoAuthor(e.target.value)} 
          className=" px-4 py-2 border border-gray-900 rounded-lg" 
          type="text" 
          name="co_author" 
        />
        <button 
          type="submit" 
          disabled={isPosting} 
          className="justify-self-center col-span-2 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Send Manuscript
        </button>
        {isDone && <p className="col-span-2 text-green-600 text-center font-bold mt-4">Manuscript is sent to editor</p>}
      </form>
    </div>
   
    </>
  )
}

export default SubmitManuscript;