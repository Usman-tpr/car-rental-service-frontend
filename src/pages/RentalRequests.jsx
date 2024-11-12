import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const RentalRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [notification, setNotification] = useState("");

    const token = localStorage.getItem('CarUser');

    useEffect(() => {
        const fetchRentalRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user/' , {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                console.log(response.data)
                if (response.data.success) {
                    setRequests(response.data.data.mybookings || []);
                }
            } catch (error) {
                console.error('Error fetching rental requests:', error);
                setError("Failed to fetch rental requests. Please try again later.");
            } finally {
                setLoading(false);
                setError(error)
            }
        };

        fetchRentalRequests();
    }, []);

    if (loading) {
        return <p className="text-center my-10">Loading rental requests...</p>;
    }

    if (error) {
        return (
            <div className=" mx-20 my-10 p-5 bg-red-100 border border-red-400 text-red-700 rounded-md">
                <p>{error}</p>
            </div>
        );
    }

    if (requests.length === 0) {
        return (
            <div className="container mx-auto my-10 p-5 bg-gray-100 text-center text-gray-700 rounded-md">
                <p>No rental requests found.</p>
            </div>
        );
    }

    return (
        <div className="mx-20 my-10 bg-gray-100 rounded-md shadow-md">
            <div className="mb-10 bg-cover bg-center h-80 flex items-center justify-center text-center bg-gray-800 rounded-md shadow-md text-white relative overflow-hidden" style={{ backgroundImage: "url('/path/to/hero-image.jpg')" }}>
                <motion.div
                    className="text-4xl font-bold uppercase z-10"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Rental Requests
                </motion.div>
                <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            </div>
            {notification && (
                <div className="mb-5 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                    {notification}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {requests.map((request) => (
                    <div key={request._id} className="p-6 bg-white rounded-md shadow-lg">
                        <img
                            src={`http://localhost:5000/${request?.car?.images[0]}`}
                            alt={request?.car?.model}
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-xl font-semibold text-gray-800">
                            {request?.car?.brand} {request?.car?.model}
                        </h2>
                        <p className="text-md text-gray-600 mt-2">Request Date: {new Date(request.createdAt).toLocaleDateString()}</p>
                        <p className="text-md text-gray-600">Price: ${request?.car?.price}</p>
                        <p className="text-md text-gray-600">Condition: {request?.car?.condition}</p>
                        <p className="text-md text-gray-600">Location: {request?.car?.location}</p>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-700">User Details:</h3>
                            <p className="text-md text-gray-600">Name: {request.userId?.name}</p>
                            <p className="text-md text-gray-600">Email: {request.userId?.email}</p>
                            <p className="text-md text-gray-600">Phone: {request.userId?.phone}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RentalRequests;
