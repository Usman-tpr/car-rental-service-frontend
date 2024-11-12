import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                {/* Logo and Brand Info */}
                <div className="mb-6 md:mb-0">
                    <h1 className="text-2xl font-bold text-white mb-2">Car Rentals</h1>
                    <p className="text-sm text-gray-400">
                        Providing the best car rental services with affordable pricing and reliable support.
                    </p>
                </div>
                
                {/* Quick Links */}
                <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
                    <h2 className="text-lg font-semibold text-white mb-3">Quick Links</h2>
                    <ul className="space-y-2">
                        <li><a href="/home" className="hover:underline">Home</a></li>
                        <li><a href="/cars" className="hover:underline">Cars</a></li>
                        <li><a href="/about" className="hover:underline">About Us</a></li>
                        <li><a href="/contact" className="hover:underline">Contact</a></li>
                    </ul>
                </div>

                {/* Social Media Links */}
                <div className="flex flex-col items-center md:items-end">
                    <h2 className="text-lg font-semibold text-white mb-3">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-500">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-600">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 mt-6 pt-4">
                <p className="text-center text-sm text-gray-500">&copy; {new Date().getFullYear()} Car Rentals. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
