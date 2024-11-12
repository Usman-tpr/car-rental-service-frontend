import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [notification, setNotification] = useState("");


    const handleCancelBooking = async (bookingId) => {
        const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
        if (!confirmCancel) return;

        const token = localStorage.getItem('CarUser');

        try {
            const response = await axios.delete(`http://localhost:5000/api/booking/cancel/${bookingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                setNotification("Booking canceled successfully.");
                setBookings(bookings.filter(booking => booking._id !== bookingId));
                setTimeout(() => setNotification(""), 3000);
            }
        } catch (error) {
            console.error('Error canceling booking:', error);
            setNotification("Failed to cancel booking. Please try again.");
            setTimeout(() => setNotification(""), 3000);
        }
    };

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem('CarUser');

            if (!token) {
                setError("User not authenticated. Please log in.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/booking/my-bookings', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBookings(response.data.data || []);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError("Failed to fetch bookings. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);



    if (loading) {
        return <p className="text-center my-10">Loading your bookings...</p>;
    }

    if (error) {
        return (
            <div className=" mx-20 my-10 p-5 bg-red-100 border border-red-400 text-red-700 rounded-md">
                <p>{error}</p>
            </div>
        );
    }

    if (bookings.length === 0) {
        return (
            <div className="container mx-auto my-10 p-5 bg-gray-100 text-center text-gray-700 rounded-md">
                <p>No bookings found.</p>
            </div>
        );
    }

    return (
        <div className="mx-20 my-10  bg-gray-100 rounded-md shadow-md">
            <div className="mb-10 bg-cover bg-center h-80 flex items-center justify-center text-center bg-gray-800 rounded-md shadow-md text-white relative overflow-hidden" style={{ backgroundImage: "url('/path/to/hero-image.jpg')" }}>
                <motion.div
                    className="text-4xl font-bold uppercase z-10"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    My Bookings
                </motion.div>
                <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            </div>
            {notification && (
                <div className="mb-5 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                    {notification}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bookings.map((booking) => (
                    <div key={booking._id} className="p-6 bg-white rounded-md shadow-lg">
                        <img
                            src={`http://localhost:5000/${booking?.car?.images[0]}`}
                            alt={booking?.car?.model}
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-xl font-semibold text-gray-800">
                            {booking?.car?.brand} {booking?.car?.model}
                        </h2>
                        <p className="text-md text-gray-600 mt-2">Booking Date: {new Date(booking.createdAt).toLocaleDateString()}</p>
                        <p className="text-md text-gray-600">Price: ${booking?.car?.price}</p>
                        <p className="text-md text-gray-600">Color: {booking?.car?.color}</p>
                        <p className="text-md text-gray-600">Condition: {booking?.car?.condition}</p>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-700">Seller Details:</h3>
                            <p className="text-md text-gray-600">Name: {booking.ownerId.name}</p>
                            <p className="text-md text-gray-600">Email: {booking.ownerId.email}</p>
                            <p className="text-md text-gray-600">Phone: {booking.ownerId.phone}</p>
                        </div>

                        <button
                            onClick={() => handleCancelBooking(booking._id)}
                            className="mt-5 bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition duration-300"
                        >
                            Cancel Reservation
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bookings;
