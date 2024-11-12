import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email: formData.email,
        password: formData.password,
      });
      console.log("the login response" , response)
      
      if (response.status === 200) {
        localStorage.setItem("CarUser" , response.data.token)
        navigate("/")
        toast.success("Logged in successfully!");
        // Navigate or perform additional login logic
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <ToastContainer />
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Welcome Back!</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-primary focus:ring-primary"
              required 
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-primary focus:ring-primary"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary text-white py-2 rounded-md mt-4 hover:bg-secondary transition-colors"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don’t have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
