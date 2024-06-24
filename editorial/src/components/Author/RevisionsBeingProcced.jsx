import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import PageIterate from "../PageIterate";
import BackToMenu from "../BackToMenu";

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
      <p className="mb-6">No Revisions under Review.</p>
     
    </div>
  );
}

function DataTable({ data }) {
  const [currentData,setCurrentData] = useState([]);
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
  function getCurrentData(dataformChild)
  {
      setCurrentData(dataformChild);
  }
  return (
    <>
         <PageIterate data={data} dataSlice={getCurrentData} numberOfPages={5}  />
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
              abstract
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
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              See your Manuscript
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
                <td
                  style={{
                    maxWidth: '200px', /* Adjust the max-width as needed */
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                  }}
                 className="text-sm text-gray-900 font-normal px-1 py-4 whitespace-normal">
                  {item.abstract}
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
                <td className={`text-sm text-gray-900 font-normal px-6 py-4 whitespace-normal ${(item.status==="Rejected") && 'text-red-500'} ${(item.status==="Under Review") && 'text-yellow-900'} ${(item.status==="Accepted") && 'text-green-500'} ${(item.status==="Major revision") && 'text-orange-500'} ${(item.status==="Minor revision") && 'text-yellow-500'}`}>
                  {item.status ? item.status : "submitted"}
                </td>
                <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                  <button onClick={e=>{handleDownload(item.filePath,item.title)}} className="bg-blue-200 hover:bg-cyan-200 p-2 rounded-md">View your manuscript </button>
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

function RevisionsBeingProcced() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/author/getRevison");
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
       {loading  ?
       <DataLoading /> 
        : !data.length ?
          <Nodata/> :
          <DataTable data={data}  />}
      {/* {JSON.stringify(data)}; */}
    </div>
  );
}

export default RevisionsBeingProcced;
