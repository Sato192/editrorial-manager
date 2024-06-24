import { IoJournal } from "react-icons/io5";
import {  useLocation } from 'react-router-dom';

function navBar () {
  const location = useLocation();
  const path = location.pathname;
  console.log(location.pathname) ;
    return (
        <nav className={`bg-gradient-to-b z-50 ${path==='/journal' && 'hidden' } from-blue-950 to-blue-800 flex items-center justify-between p-4  sticky shadow-md top-0`}>
          <a href="/" className='text-3xl flex items-center space-x-2 font-sans font-bold text-cyan-50'><IoJournal /> Editorial Manager</a>
          <div className='space-x-8'>
            {/* <a className="bg-blue-800 p-3 rounded-md text-white font-bold hover:bg-blue-600" href='/reviewer'> Reviewr</a>
            <a className="bg-blue-800 p-3 rounded-md text-white font-bold hover:bg-blue-600" href='/editor'> Editor</a>
            <a className="bg-blue-800 p-3 rounded-md text-white font-bold hover:bg-blue-600" href='/author'> Author</a> */}
            <a className="bg-blue-800 p-3 rounded-md text-white font-bold hover:bg-blue-600" href='/about'> About</a>

          </div>
        </nav>
    )
  }
  
  export default navBar;
  