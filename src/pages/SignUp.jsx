import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', phone:'' });
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/user/signup', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
            });
            console.log('the signup response', response)

           if(response.data.errors){
            return toast.error(response.data.errors[0]);

           }
            if (response.status === 201) {

                if (response.data.data === null) {
                    return toast.error("Already Used Email Please Login");
                }
                else {
                    toast.success("Account created successfully!");
                    navigate("/login")
                }
            } else {
                toast.error("Failed to create an account");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <ToastContainer />
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create an Account</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-primary focus:ring-primary"
                            required
                        />
                    </div>

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
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
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

                    <div>
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-primary focus:ring-primary"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-md mt-4 hover:bg-secondary transition-colors"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
