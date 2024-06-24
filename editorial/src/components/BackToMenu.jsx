import React, { Children } from 'react'
import { useNavigate } from 'react-router-dom'
function BackToMenu(props) {
  const navigateTo = useNavigate();
  return (
    <button onClick={()=>navigateTo(-1)} className=" bg-slate-500 text-white mt-1 font-medium p-2 ml-3 mb-2 rounded-md "  > {props.children}</button>
  )
}

export default BackToMenu