import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ibnoZohrLogo from "../images/IbnoZohr.png"
import LoadingScreen from "../components/LoadingScreen";
function Log() {
  const [text, setText] = useState(false);
  const [loading,setLoading]= useState(false);
  const [data,setData]= useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigateTo = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/auth/login", {
        role: role,
        email: username,
        password: password,
      });
      const user = response.data;
      console.log(user);
      setData(user);
      console.log(user);
      console.log("done hh");
      if (user === 'author') {
       navigateTo('/author');
      } else if (user === 'editor') {
       navigateTo('/editor');
      } else if (user === 'reviewer') {
        navigateTo('/reviewer');
      }
      else if (user === 'admin') {
        navigateTo('/admin');
      }else 
      {
        console.log('ivalid')
        setText(true);
      }
      setLoading(false);
  
   
    } catch (error) {
      console.error("Error sending data:", error);
    }
    setUsername("");
    setPassword("");
    setRole("");
    e.target.reset();
  };
  return (
    <form className="self-center" method="post" onSubmit={handleSubmit}>
    { loading &&  < LoadingScreen />}
      <div className="grid grid-cols-2 text-center mx-auto gap-3 mb-4 ">
        {text && 
        <h1 className="col-span-2 text-sm font-thin text-red-900"> invalid email or password </h1>}
        <label htmlFor="username">
          <b>Email :</b>
        </label>
        <input
          className="border ring-1 ring-gray-900 rounded-md px-1 hover:scale-105"
          type="text"
          placeholder="Enter your email"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        ></input>
        <label htmlFor="password">
          <b>Password :</b>
        </label>
        <input
          className="border ring-1 ring-gray-900 rounded-md px-1 hover:scale-105 "
          type="password"
          placeholder="Enter Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
      </div>

      <div className="text-center space-x-5 mb-7 space-y-1 items-center">
        <input className='hover:scale-125 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600' required onClick={() => { setRole("author") }} type="radio" id="role1" name="role" value="author" />
        <label htmlFor="role1">Author</label>
        <input className='hover:scale-125 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600' onClick={() => { setRole("editor") }} type="radio" id="role2" name="role" value="editor" />
        <label htmlFor="role2">Editor</label>
        <input className='hover:scale-125 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600' onClick={() => { setRole("reviewer") }} type="radio" id="role3" name="role" value="reviewr" />
        <label htmlFor="role3">Reviewr</label>
        <input className='hover:scale-125 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600' onClick={() => { setRole("admin") }} type="radio" id="role4" name="role" value="admin" />
        <label htmlFor="role4">Admin</label>
      </div>
      <div className="flex justify-center items-center">
      <button
        className="bg-violet-950 rounded-lg text-xl font-bold text-white pb-1 mb-4 my-2 shadow-sm px-2 hover:bg-violet-600"
        type="submit"
      >
        Login
      </button>
      </div>
    </form>
  );
}

function RegisterContinue ()
{
  return (
    <div className=" flex  justify-center items-center fixed inset-0 backdrop-blur-sm bg-gray-300  bg-opacity-15" >
    <div  className=" bg-gray-100  rounded-md shadow-md p-4   ">
      <form>
      <div className="grid grid-cols-2 text-center p-3 mx-auto gap-3 mb-4 ">
        <h1 className="text-left pl-3 col-span-2" >login information</h1>
        <label  htmlFor="">Username</label>
        <input className="border " type="text" />
        <label htmlFor="">Username</label>
        <input className="border "  type="text" />
        <label htmlFor="">Username</label>
        <input className="border "  type="text" />
      </div>
      <div className="grid grid-cols-2 text-center p-3 mx-auto gap-3 mb-4 ">
        <h1 className="text-left pl-3 col-span-2" >login information</h1>
        <label htmlFor="">Username</label>
        <input className="border "  type="text" />
        <label htmlFor="">Username</label>
        <input className="border "  type="text" />
        <label htmlFor="">Username</label>
        <input className="border "  type="text" />
      </div>
      </form>
    </div>
</div>
  )
}

function Register() {
  const [email,setEmail]= useState('');
  const [nom,setNom]= useState('');
  const [password,setPassword]= useState('');
  const navigateTo = useNavigate();
  const [color,setColor]= useState('');

  const [affiliation, setAffiliation] = useState('');
const [orcid, setOrcid] = useState('');
const [interests, setInterests] = useState('');
const [biography, setBiography] = useState('');
const [errorMessage,setErrorMessage]= useState(false);
  const handleRegister = async (e)=>{
    e.preventDefault();
    try {
     const  response = await axios.post('http://localhost:3000/auth/register',
      {
        email : email,
        nom : nom,
        password : password,
        affiliation : affiliation,
      });
      console.log(response.data)
      if(response.data === "error")
        {
          setErrorMessage("Email is already in use");
          setColor("text-red-500");
        }
      else{
        setColor("text-green-500");
        e.target.reset();
        setErrorMessage("You are registered")
        setTimeout(() => {
          navigateTo(0);
      }, 500);
     
      }
     
    }
   catch (error) {
    console.error('Error sending data:', error);
  }
  
  }
  return (
    <form method="post" onSubmit={handleRegister}>
      <div className="grid grid-cols-2 text-center gap-3 mb-4">
  <label htmlFor="email">
    <b>Email :</b>
  </label>
  <input
    type="email"
    className="border rounded-md px-1"
    placeholder="example@aaa.cc"
    name="email"
    required
    onChange={e => setEmail(e.target.value)}
  />

  <label htmlFor="name">
    <b>Full name :</b>
  </label>
  <input
    className="border rounded-md px-1"
    type="text"
    placeholder="First and Last Name"
    name="name"
    required
    onChange={e => setNom(e.target.value)}
  />

  <label htmlFor="password">
    <b>Password :</b>
  </label>
  <input
    className="border rounded-md px-1"
    type="password"
    placeholder="*******"
    name="password"
    required
    onChange={e => setPassword(e.target.value)}
  />
  <label htmlFor="password">
    <b>confirmPassword :</b>
  </label>
  <input
    className="border rounded-md px-1"
    type="password"
    placeholder="*******"
    name="password"
    required
    onChange={e => setPassword(e.target.value)}
  />

  <label htmlFor="affiliation">
    <b>Affiliation :</b>
  </label>
  <input
    className="border rounded-md px-1"
    type="text"
    placeholder="University or Institution"
    name="affiliation"
    required
    onChange={e => setAffiliation(e.target.value)}
  />

  <label htmlFor="orcid">
    <b>ORCID iD :</b>
  </label>
  <input
    className="border rounded-md px-1"
    type="text"
    placeholder="https://orcid.org/0000-0000-0000-0000"
    name="orcid"
    onChange={e => setOrcid(e.target.value)}
  />

  <label htmlFor="interests">
    <b>Research Interests :</b>
  </label>
  <input
    className="border rounded-md px-1"
    type="text"
    placeholder="Research Topics"
    name="interests"
    onChange={e => setInterests(e.target.value)}
  />

  <label htmlFor="biography">
    <b>Brief Biography :</b>
  </label>
  <textarea
    className="border rounded-md px-1 resize-none h-20"
    placeholder="A short bio"
    name="biography"
    onChange={e => setBiography(e.target.value)}
  />
  
</div>

{errorMessage && (
        <div className={`text-center ${color} text-sm mb-4`}>
          {errorMessage}
        </div>
      )}


      <div className="text-center space-x-7 mb-7">
        <button 
          className="bg-slate-700 font-bold text-white rounded-sm shadow-sm px-2 hover:bg-white hover:text-slate-700"
          type="submit"
        >
          Register
        </button >
      </div>
      {/* <RegisterContinue/> */}
    </form>
  );
}

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className=" bg-slate-50  ">
      <h1 className="text-center shadow-2xl shadow-black  font-extrabold font-mono py-5 text-2xl border-b-2 border-black "> SCIENTIFIC JOURNALS </h1>
    <div className=" bg-gradient-to-b from-white via-slate-200 to-gray-200  flex justify-around items-start  shadow-md p-5 ">
     <div className="mt-9"> 
    <img width={300} className=" " src={ibnoZohrLogo}>
    </img>
     </div>
      <div className=" mr-20  bg-gray-100  p-6 text-black font-medium  shadow-lg shadow-gray-500  rounded-xl mb-10">
        <h1 className="text-center text-xl">Please enter the following :</h1>
        <hr className=" border border-gray-300 m-2"></hr>
        {isLogin ? <Log /> : <Register />}
        <div className="text-center">
          <button
            className="bg-blue-900 p-2 rounded-md mt-3 text-white hover:bg-blue-600 font-bold"
            onClick={toggleForm}
          >
            {isLogin ? "Register now " : "Cancel"}
          </button>
        </div>
      </div>
      <div>
      <ul className=" font-mono font-bold flex flex-col mr-20 mt-12 ">
      <li><a className="hover:text-white" href="https://www.youtube.com/watch?v=LovBG0oKn7A&pp=ygUhYXV0aG9yIHR1dG9yaWFsIGVkaXRvcmlhbCBtYW5hZ2Vy" target="_blank" >Author Tutorial</a></li>
      <li><a className="hover:text-white"  href="https://www.youtube.com/watch?v=Ll-yI2DRiCY&pp=ygUhZWRpdG9yIHR1dG9yaWFsIGVkaXRvcmlhbCBtYW5hZ2Vy" target="_blank" >Editor Tutorial</a></li>
      <li><a className="hover:text-white"  href="https://www.youtube.com/watch?v=Fhxus7rvSqE&pp=ygUjcmV2aWV3ZXIgdHV0b3JpYWwgZWRpdG9yaWFsIG1hbmFnZXI%3D" target="_blank" >Reviewer Tutorial</a></li>
      <li><a className="hover:text-white"  href="" target="_blank" >about us</a> </li>
      <li><a className="hover:text-white"  href="#" target="_blank" >Contact Us</a> </li>

      </ul>
     </div>
    </div>
    <article className="text-sm font-sans  space-y-2 bg-gray-300 py-2 px-2 leading-loose" >
      <p><b>Authors:</b> Use the "Author " radio button to submit your manuscript or check on its progress.</p>
      <p><b>Manuscript Reviewers:</b> Use the "Reviewer Login" button to respond to an invitation, download a manuscript for review, or submit your review.</p>
      <p><b>First-time users:</b> You may already have an account if you have received an email asking you to review a manuscript, or if you have recently submitted an article. If you know your email and password, enter it above.</p>
    </article>
    <footer className="bg-blue-800 text-white py-6 ">
      <div className="container mx-auto text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} Editorial Manager. All Rights Reserved.</p>
        <nav className="flex justify-center space-x-4">
          <a href="/about" className="hover:text-gray-400">About Us</a>
          <a href="/contact" className="hover:text-gray-400">Contact</a>
          <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-400">Terms of Service</a>
        </nav>
      </div>
    </footer>
    </div>
  );
}

export default LoginRegister;
