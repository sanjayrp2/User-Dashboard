import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoleContext } from '../../Context/Rolecontext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
export default function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const { setRole } = useContext(RoleContext);

  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const response=await axios.post("http://localhost:7000/user/login",{email,password});
      if(response.data.status==="ok"){
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('role',response.data.role);
        localStorage.setItem('email',response.data.email);
        localStorage.setItem('count',response.data.count);
        localStorage.setItem('lastlogindate',response.data.lastlogindate);
        setRole(response.data.role);
      toast.success("Login Succesful!");
      navigate('/');
      }
      else{
        toast.error("Invalid Email or Password");
      }
     
    }
    catch(error){
      console.error('Login error:', error);
      toast.error('An error occurred during login. Please try again.');
    }
    setLoading(false);
  };

  const validateForm=()=>{
    if(!email||!password){
      toast.error('Email and password are required.');
      return false;
    }
    return true;
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(validateForm()){
      handleLogin(e);
    }
  }
  return (
    <>
     <div className="flex items-center justify-center h-screen bg-gray-200">
      <ToastContainer/>
      <form  onSubmit={handleSubmit}className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md '>
         <h1 className='text-2xl font-bold mb-6 text-center'>Login</h1>
         <div className='mb-4'>
          <label  className='block text-gray-700 text-lg'>Email</label>
          <input type="text" name="email" className='w-full p-2 border rounded-lg' onChange={(e)=>{setEmail(e.target.value)}}/>
         </div>
         <div className='mb-4 '>
          <label className='block text-gray-700 text-lg' >Password</label>
          <input type="text" name="password" className='w-full p-2 border rounded-lg' onChange={(e)=>{setPassword(e.target.value)}}/>
         </div>
         <button type="submit" className="w-full bg-green-400 text-white p-2 rounded-lg " >
          Login 
        </button>
  
        <div className='flex justify-center items-center mt-3'>
          <h1>Don't have an account ? <span className='text-blue-600 cursor-pointer'onClick={()=>{navigate('/signup')}}>Sign up</span></h1>
        </div>
      </form>
     </div>
    </>
  )
}
