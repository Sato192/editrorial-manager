  import { useState } from "react";
const Section = (props) => {
    const [bar,setBar]=useState(false);
    return (
      <div className=" shadow-md grid grid-cols-1 items-start bg-gray-200  border-b m-11">
        <div className="font-medium text-2xl text-center  text-fuchsia-900">
         <h1 className="  border rounded-md p-2  "> {props.title}</h1> 
         </div>
    
        <div className=" p-8 mx-20">
        <ul className=" grid  space-y-1 ">
        {props.children}    
        </ul>
        </div>
     

      </div>
    );
  };
  export default Section;