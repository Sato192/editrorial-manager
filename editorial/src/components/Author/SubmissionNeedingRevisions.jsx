import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import PageIterate from "../PageIterate";
import { useNavigate } from "react-router-dom";
import BackToMenu from "../BackToMenu";
import LoadingScreen from "../LoadingScreen";

function Action({note}) {

  return (

<main onClick={(e) => e.stopPropagation()} className='mt-5 bg-indigo-100 shadow-md rounded-md w-1/2 py-5 px-10'>
        <h1 className="text-wrap text-2xl text-left whitespace-pre-wrap">{note}</h1>
      </main>
  )
}
function DataLoading() {
  return (
    <div className="p-4  text-center ">
      <p className="mb-6">Loading data ...</p>
    </div>
  );
}

function Nodata() {
  return (
    <div className="p-4  text-center ">
      <p className="mb-6">No Submissiongit remote add origin https://github.com/Sato192/editrorial-manager.git.</p>
      <a
        className=" p-2 border border-gray-300 mt-5 rounded-md hover:bg-slate-200 bg-slate-400 font-bold "
        href="/author/submitManuscript"
      >
        {" "}
        Soumettre un manuscript
      </a>
    </div>
  );
}

function DataTable({ data }) {
  const [currentData, setCurrentData] = useState([]);
  const [note,setNote]= useState();
  const [file, setFile] = useState();
  const navigateTo = useNavigate();
  const [click,setClick]=useState(false);
  const [loading, setLoading] = useState(false)
  function getCurrentData(dataformChild) {
    setCurrentData(dataformChild);
  }
  const handleFileChange = async (e, id) => {
    setLoading(true);
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('manuscriptId', id);

    try {
      const response = await axios.post('http://localhost:3000/author/SubmitRevised', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data === 'ok') {
        setLoading(false);
        navigateTo(0);
        setIsDone(true);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }

  }
  const handleAction = (editorNote)=>{
    setClick(!click);
    setNote(editorNote);
  }
  return (
    <>
      <PageIterate data={data} dataSlice={getCurrentData} numberOfPages={5} />
      <table
        className={
          " shadow-md border min-w-full " + (data.length == 0 && "hidden")
        }
      >
        <thead className="bg-slate-300 border-b border-black">
          <tr>

            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              manuscriptTitle
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              manuscriptType
            </th>

            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              upload time
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              coAuthor
            </th>

            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              affiliation
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              status
            </th>
            <th className="text-sm font-extrabold text-gray-900 px-6 py-4 text-left">
              Submit your Revision
              {loading && <LoadingScreen />}
            </th>
            {/* */}
          </tr>
        </thead>
        <tbody className="">
          {currentData.map((item, index) => (
            <>
              <tr
                key={index}
                className={
                  " border-b transition duration-300 ease-in-out " +
                  (Number(index) % 2 != 0
                    ? "bg-white hover:bg-gray-300"
                    : "bg-gray-50 hover:bg-gray-300")
                }
              >

                <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                  {item.title}
                </td>
                <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                  {item.M_type}
                </td>

                <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                  {item.upoladDate}
                </td>
                <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                  {item.coAuthor}
                </td>

                <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                  {item.affiliation}
                </td>
                <td className={`text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal ${(item.status === "Rejected") && 'text-red-500'} ${(item.status === "Under Review") && 'text-yellow-900'} ${(item.status === "Accepted") && 'text-green-500'} ${(item.status === "Major revision") && 'text-orange-500'} ${(item.status === "Minor revision") && 'text-yellow-500'}`}>
                  {item.status ? item.status : "submitted"}
                </td>

                <td  className="text-sm text-gray-900 grid grid-cols-1 text-center items-center space-y-2 font-normal px-6 py-4 whitespace-nowrap">
                  <label
                    htmlFor="fileInput"
                    className="bg-blue-400 hover:bg-blue-500 text-white font-bold p-2 rounded-md cursor-pointer"
                  >
                    {file ? file : "Add Manuscript"}
                  </label>
                  <input
                  accept="application/pdf,application" 
                    id="fileInput"
                    type="file"
                    onChange={(e) => handleFileChange(e, item._id)}
                    className="hidden"
                  />
                  <button
                  onClick={()=>{handleAction(item.editorNote)}}
                    type="submit"
                    className="justify-self-center col-span-2 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    See Review
                  </button>
                { click &&
                    <div onClick={()=>setClick(!click)} className=" flex  justify-center items-center fixed inset-0  bg-gray-50  bg-opacity-40" >

                 <Action note={note} />
                 </div>}
                </td>
                {/* Add more cells for other properties if needed */}
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}

function SubmissionNeedingRevisions() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/author/SubmissionNeedingRevision");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-10 bg-slate-100 h-screen ">
      <BackToMenu href="/author">Author Menu</BackToMenu>
      {loading ?
        <DataLoading />
        : !data.length ?
          <Nodata /> :
          <DataTable data={data} />}
      {/* {JSON.stringify(data)}; */}
    </div>
  );
}

export default SubmissionNeedingRevisions;
