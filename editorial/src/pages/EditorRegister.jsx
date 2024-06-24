import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function EditorRegister() {
    const [email, setEmail] = useState('');
    const [nom, setNom] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState(false);
        const navigateTo = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/editorReg',
                {
                    email: email,
                    nom: nom,
                    password: password
                });
            console.log(response.data);
            if (response.data==="done") {
               navigateTo('/');
            }
            else if(response.data==="error")
                {
                    setErrorMessage(true);
                }
            e.target.reset();
        }
        catch (error) {
            console.error('Error sending data:', error);
        }
        e.target.reset();
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Editor Registration</h2>
                <form onSubmit={handleRegister}>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <div>
                            <label htmlFor="email" className="block font-semibold mb-1">Email :</label>
                            <input
                                type="email"
                                className="border rounded-md px-3 py-2 w-full"
                                placeholder="example@aaa.cc"
                                name="email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="name" className="block font-semibold mb-1">Full name :</label>
                            <input
                                className="border rounded-md px-3 py-2 w-full"
                                type="text"
                                placeholder="First and Last Name"
                                name="name"
                                required
                                onChange={(e) => setNom(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block font-semibold mb-1">Password :</label>
                            <input
                                className="border rounded-md px-3 py-2 w-full"
                                type="password"
                                placeholder="*******"
                                name="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="affiliation" className="block font-semibold mb-1">Affiliation :</label>
                            <input
                                className="border rounded-md px-3 py-2 w-full"
                                type="text"
                                placeholder="University or Institution"
                                name="affiliation"
                                
                                onChange={(e) => setAffiliation(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="orcid" className="block font-semibold mb-1">ORCID iD :</label>
                            <input
                                className="border rounded-md px-3 py-2 w-full"
                                type="text"
                                placeholder="https://orcid.org/0000-0000-0000-0000"
                                name="orcid"
                                onChange={(e) => setOrcid(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="interests" className="block font-semibold mb-1">Research Interests :</label>
                            <input
                                className="border rounded-md px-3 py-2 w-full"
                                type="text"
                                placeholder="Research Topics"
                                name="interests"
                                onChange={(e) => setInterests(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="biography" className="block font-semibold mb-1">Brief Biography :</label>
                            <textarea
                                className="border rounded-md px-3 py-2 w-full"
                                placeholder="A short bio"
                                name="biography"
                                onChange={(e) => setBiography(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block font-semibold mb-1">Phone Number :</label>
                            <input
                                className="border rounded-md px-3 py-2 w-full"
                                type="tel"
                                placeholder="Phone Number"
                                name="phone"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="linkedin" className="block font-semibold mb-1">LinkedIn Profile :</label>
                            <input
                                className="border rounded-md px-3 py-2 w-full"
                                type="url"
                                placeholder="https://www.linkedin.com/in/username"
                                name="linkedin"
                                onChange={(e) => setLinkedin(e.target.value)}
                            />
                        </div>
                    </div>

                    {errorMessage && (
                        <div className="text-center text-red-500 text-sm mb-4">
                            Email already in use
                        </div>
                    )}

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditorRegister