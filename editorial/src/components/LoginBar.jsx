import React, { useEffect , useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function LoginBar() {
  const [nom,setNom]= useState();
  useEffect( ()=> { 
    const getNom = async ()=>{
    try {
      const response = await axios.get('http://localhost:3000/getname');
      setNom(response.data);
    }
    catch(error){
      console.log('error');
    }
    }
    getNom();
  }, [] ) ;
    const navigateTo = useNavigate();
    const handleLogOut = async () => {
        try {
          const response = axios.post('http://localhost:3000/logout');
          console.log(response.data)
          navigateTo('/');
        } catch (error) {
          console.error('Logout error:', error);
        }
      };
  return (
    nom &&
    <nav className="bg-gradient-to-r from-slate-300 via-white to-indigo-200 flex items-center justify-between px-6 shadow-lg py-3 rounded-lg">
    <p className="text-xl flex items-center font-sans font-bold text-indigo-900">Welcome: {nom}</p>
    <button
      className="bg-gray-600 rounded-lg text-white py-2 px-4 shadow-md hover:bg-yellow-500 transition duration-300"
      onClick={handleLogOut}
    >
      LogOut
    </button>
  </nav>

  )
}

export default LoginBar