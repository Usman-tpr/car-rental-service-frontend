import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // Animation library for scroll effects

const Profile = () => {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('CarUser');

            if (!token) {
                setError("User not authenticated. Please log in.");
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/user/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data.data.user);
                

                // Fetch user's products
                const productsResponse = await axios.get('http://localhost:5000/api/cars/my-cars', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProducts(productsResponse.data.data);
            } catch (error) {
                console.error('Error fetching user profile or products:', error);
                setError("Failed to fetch user details or products. Please try again later.");
            }
        };

        fetchUserProfile();
    }, []);

    // Handle Delete Confirmation
    const handleDeleteClick = (productId) => {
        setProductToDelete(productId);
        setShowPopup(true);
    };

    // Confirm Delete Function
    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem('CarUser');
            await axios.delete(`http://localhost:5000/api/cars/${productToDelete}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts(products.filter(product => product._id !== productToDelete));
            setShowPopup(false);
            setProductToDelete(null);
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product. Please try again.");
            setShowPopup(false);
        }
    };

    if (error) {
        return (
            <div className="container mx-auto my-10 p-5 bg-red-100 border border-red-400 text-red-700 rounded-md">
                <p>{error}</p>
            </div>
        );
    }

    if (!user) {
        return <p className="text-center my-10">Loading user profile...</p>;
    }


    return (
        <div className="container mx-auto my-10 p-5 bg-gray-100 rounded-md shadow-md">
            <div className="bg-cover bg-center h-80 flex items-center justify-center text-center bg-gray-800 rounded-md shadow-md text-white relative overflow-hidden" style={{ backgroundImage: "url('/path/to/hero-image.jpg')" }}>
                <motion.div
                    className="text-4xl font-bold uppercase z-10"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    My Profile
                </motion.div>
                <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            </div>
            <div className="text-center">
            </div>
            <div className="mt-8 p-6 bg-white rounded-md shadow-lg flex flex-col items-center">
                <img
                    src={user.profileImage || 'https://via.placeholder.com/150'}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border border-gray-300 shadow-md"
                />
                <h2 className="text-2xl font-semibold mt-4 text-gray-800">{user.name}</h2>
                <p className="text-lg text-gray-600 mt-2">Email: {user.email}</p>
                <p className="text-lg text-gray-600 mt-1">Phone: {user.phone}</p>

                <div className="mt-8 w-full flex justify-center">
                    <div className="p-4 bg-gray-50 rounded-md shadow-sm text-center w-full md:w-2/3 lg:w-1/2">
                        <h3 className="text-xl font-bold text-gray-700">About Me</h3>
                        <p className="text-md mt-3 text-gray-600">
                            {user.about || "No additional information provided."}
                        </p>
                    </div>
                </div>
            </div>

            {/* My Products Section */}
            <div className="mt-12">
                <h2 className="text-3xl font-bold text-primary mb-6">My Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.length > 0 ? products.map((product) => (
                        <div key={product._id} className="p-4 bg-white rounded-md shadow-md">
                            <img src={`http://localhost:5000/${product.images[0]}`} alt={product.model} className="w-full h-40 object-cover rounded-md" />
                            <h3 className="text-lg font-semibold mt-2">{product.model}</h3>
                            <p className="text-gray-600">Brand: {product.brand}</p>
                            <p className="text-gray-600">Price: ${product.price}</p>
                            <button
                                onClick={() => handleDeleteClick(product._id)}
                                className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                        :
                        <p>No Products Posted yet</p>


                    }
                </div>
            </div>

            {/* Delete Confirmation Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md text-center">
                        <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
                        <p>Are you sure you want to delete this product?</p>
                        <div className="mt-6 flex justify-center space-x-4">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
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

export default Profile;
