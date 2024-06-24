import React from "react";
import { useEffect, useState } from "react";

function PageIterate ({data, dataSlice, numberOfPages})
{
  const [CurrentPage, setCurrentPage] = useState(0);
  function next() {
    setCurrentPage(CurrentPage + 1);
  }
  function prev() {
    setCurrentPage(CurrentPage - 1);
  }
  const indexStart = CurrentPage *numberOfPages ;
  const indexEnd = indexStart + numberOfPages;
  useEffect(()=>{
    dataSlice(data.slice(indexStart, indexEnd));
  },[CurrentPage,data])
   
  return (
(  data.length > numberOfPages) &&
    <div className="  flex justify-center items-center mb-4 space-x-6">
  <button
    className={`px-2 py-2 rounded-lg border-2 border-blue-500 ${
      CurrentPage === 0 ? "bg-blue-200 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-500"
    } font-semibold text-white`}
    onClick={prev}
    disabled={CurrentPage === 0}
  >
    Previous
  </button>
  
  <Pagenumber current={CurrentPage} pages={Math.ceil(data.length / numberOfPages)} setCurrent={setCurrentPage} />
  
  <button
    className={`px-4 py-2 rounded-lg border-2 border-blue-500 ${
      indexEnd >= data.length ? "bg-blue-200 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-500"
    } font-semibold text-white`}
    onClick={next}
    disabled={indexEnd >= data.length}
  >
    Next
  </button>
</div>

 
  )
}

function Pagenumber(props) {
  function getStartIndex( ) {
    if (props.current-4 <0)
    {
      return 0
    }
    return props.current-4;
  }
  function getEndIndex()
  {
    if(props.current-2<0)
    {return 5}
    return props.current+5;
  }
  
  function creatArray(n)
  {
    let array = [];
    for(let i=0; i<n ; i++)
    {
      array.push(i+1);
    }
    return array;
  }
  let pagesArray = creatArray(props.pages);
  let currentPages = pagesArray.slice(getStartIndex(),getEndIndex());
  return (
    <div className=" space-x-1">
          {currentPages.map( (page,index) =>(
        <button key={index} onClick={()=>props.setCurrent(page-1)} className={` p-1 rounded-lg ${page==props.current+1 ? "bg-slate-400" : "bg-slate-200" }`}>
        {page.toString()}
      </button>
      )
      )}
    </div>
  
      
  );
}

export default PageIterate;