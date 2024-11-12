import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import Card from '../Components/Home/Card';
import { motion } from 'framer-motion';
const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Extract parameters
                const condition = searchParams.get('condition');
                const price = searchParams.get('price');
                const brand = searchParams.get('brand');
                const location = searchParams.get('location');

                // Construct query string based on which parameter is provided
                let queryParam = '';
                if (condition) {
                    queryParam = `condition=${condition}`;
                } else if (price) {
                    queryParam = `price=${price}`;
                } else if (brand) {
                    queryParam = `brand=${brand}`;
                } else if (location) {
                    queryParam = `location=${location}`
                }

                // Only make the API call if a valid parameter exists
                // if (queryParam) {
                const response = await axios.get(`http://localhost:5000/api/cars/search?${queryParam}`);
                setProducts(response.data.data);
                // } else {
                //     setProducts([]); // Clear products if no valid query parameter
                // }
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchParams]);

    if (loading) {
        return <p className="text-center my-10">Loading products...</p>;
    }

    if (error) {
        return (
            <div className="container mx-auto my-10 p-5 bg-red-100 border border-red-400 text-red-700 rounded-md">
                <p>{error}</p>
            </div>
        );
    }

    if (products.length < 1) {
        return <p className="text-center my-10">No Products Found For This...</p>;
    }


    return (
        <div className="mx-20 my-10 p-5">
            <div className=" mb-10 bg-cover bg-center h-80 flex items-center justify-center text-center bg-gray-800 rounded-md shadow-md text-white relative overflow-hidden" style={{ backgroundImage: "url('/path/to/hero-image.jpg')" }}>
                <motion.div
                    className="text-4xl font-bold uppercase z-10"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    All Products
                </motion.div>
                <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {products.map((product) => (
                    <Card
                        key={product._id}
                        id={product._id}
                        condition={product.condition}
                        price={product.price}
                        color={product.color}
                        model={product.model}
                        brand={product.brand}
                        image={product.images}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
