import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
export default function Signup() {

const [name,setName]=useState('');
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [confirmPassword,setCpass]=useState('');
const [gender,setGender]=useState('');
const navigate = useNavigate();

const validation=()=>{
    if (!name || !email || !password || !confirmPassword || !gender) {
        toast.error('All fields are required.');
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        toast.error('Invalid email format.');
        return false;
    }
    if(password.length<6){
        toast.error('password must be at least 6 characters')
        return false;
    }
    if (password !== confirmPassword) {
        toast.error('Passwords do not match.');
        return false;
    }
    return true;    
};

const handleSubmit =async(e)=>{
    e.preventDefault()
    if(!validation()) return;
    try{
        const response=await axios.post("http://localhost:7000/user/signup",{name,email,password,gender})
        console.log(response)
        if(response.data.status==="ok"){
            toast.success("signup Succesful!");
            navigate('/');
        }
        else{
            toast.error(response.data.message || "Signup failed");
        }
    }
    catch(error){
        console.log(error);
    }
}
  return (
    <>
    <div className="flex items-center justify-center h-screen bg-gray-200">
        <ToastContainer/>
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 ">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 ">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e)=>setCpass(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700">Gender</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={(e)=>setGender(e.target.value)}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={(e)=>setGender(e.target.value)}
                className="mr-2"
              />
              Female
            </label>
          </div>
        </div>
        
        <button type="submit" className="w-full bg-green-400 text-white p-2 rounded-lg " >
          Sign Up
        </button>
        
        <div className="mt-4 text-center">
          <p>
            Already have an account?{' '}
            <span className="text-blue-600 cursor-pointer" onClick={() => { navigate('/login') }}>Log in</span>
          </p>
        </div>
      </form>
    </div>
    </>
  )
}
