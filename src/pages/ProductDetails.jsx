import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
const ProductDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [notification, setNotification] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [ownerId, setOwnerId] = useState()
    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/cars/get-car/${id}`);
                console.log("single" , response.data.data)
                setCar(response.data.data);
                setOwnerId(response.data.data.userId)
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };

        fetchCarDetails();
    }, [id]);

    const handleBooking = async () => {
        const token = localStorage.getItem('CarUser');

        if (!token) {
            setNotification("User not authenticated. Please log in.");
            setTimeout(() => setNotification(""), 3000);
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/api/booking/add',
                { car: id, ownerId: ownerId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                setNotification("Booking successful! Your reservation is confirmed.");
            }
        } catch (error) {
            console.error('Error creating booking:', error);
            setNotification("An error occurred while booking. Please try again.");
        } finally {
            setShowModal(false);
            setTimeout(() => setNotification(""), 3000);
        }
    };

    if (!car) {
        return <p>Loading...</p>;
    }

    return (
        <div className="mx-20 my-10 p-5 bg-gray-100 rounded-md shadow-md">
            <div className=" mb-10 bg-cover bg-center h-80 flex items-center justify-center text-center bg-gray-800 rounded-md shadow-md text-white relative overflow-hidden" style={{ backgroundImage: "url('/path/to/hero-image.jpg')" }}>
                <motion.div
                    className="text-4xl font-bold uppercase z-10"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Product Details
                </motion.div>
                <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            </div>
            <div className="flex">
                <div className="w-1/2">
                    <img src={`http://localhost:5000/${car.images[0]}`} alt={car.model} className="w-full h-auto rounded-md shadow-lg" />
                </div>
                <div className="ml-10 w-1/2">
                    <h1 className="text-4xl font-bold text-primary">{car.brand} {car.model}</h1>
                    <p className="text-2xl font-semibold mt-3 text-gray-700">Price: <span className="text-green-600">${car.price}</span></p>
                    <p className="text-lg mt-2 text-gray-600">Condition: {car.condition}</p>
                    <p className="text-lg mt-1 text-gray-600">Location: {car.location}</p>
                    <p className="text-lg mt-4 text-gray-800">Description:</p>
                    <p className="text-md mt-2 text-gray-600 leading-relaxed">{car.description}</p>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-secondary text-white px-6 py-3 mt-5 rounded-md shadow hover:bg-primary transition duration-300"
                    >
                        Book Now
                    </button>

                    {notification && (
                        <div className="mt-5 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                            {notification}
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-10 p-5 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Why Choose Us?</h2>
                <p className="text-md text-gray-600 leading-relaxed mb-4">
                    We offer top-notch vehicles that are regularly maintained to ensure a comfortable and safe driving experience.
                    Whether you're looking for an affordable city car, a reliable family vehicle, or a luxury ride for a special occasion,
                    we have the perfect option for you. Booking is easy and quick, with flexible pickup and return options.
                </p>
                <p className="text-md text-gray-600 leading-relaxed mb-4">
                    Our support team is always ready to assist you with any questions, ensuring a smooth and hassle-free experience.
                    Join our growing community of satisfied customers today, and discover the difference with our high-quality service.
                </p>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-md text-center">
                        <h2 className="text-2xl font-bold mb-4">Confirm Booking</h2>
                        <p className="text-md text-gray-700 mb-6">Are you sure you want to book this car?</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleBooking}
                                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
