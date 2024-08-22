import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const navigate = useNavigate();

    // Retrieve user data from local storage
    const user = {
        name: localStorage.getItem('name') || 'N/A',
        email: localStorage.getItem('email') || 'N/A',
        gender: localStorage.getItem('gender') || 'N/A'
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('gender');
        navigate('/login');
        toast.success('Logged out successfully!');
    };

    return (
        <>
            <div className="flex items-center justify-center h-screen bg-gray-200 p-4">
                <ToastContainer />
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h1 className="text-2xl font-bold mb-4 text-center">User Details</h1>
                    <div className="text-center mb-4">
                        <div className="text-lg font-semibold">Name: {user.name}</div>
                        <div className="text-lg font-semibold">Email: {user.email}</div>
                        <div className="text-lg font-semibold">Gender: {user.gender}</div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
