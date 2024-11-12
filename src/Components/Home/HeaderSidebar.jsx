import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderSidebar = () => {
    const navigate = useNavigate();
    const [selectedDistrict, setSelectedDistrict] = useState("");

    const handleRedirect = (filterType, value) => {
        navigate(`/products?${filterType}=${value}`);
    };

    const handleLocationClick = () => {
        if (selectedDistrict) {
            handleRedirect('location', selectedDistrict);
        }
    };

    const districts = [
        "Karachi", "Lahore", "Islamabad", "Faisalabad", "Rawalpindi", 
        "Multan", "Hyderabad", "Peshawar", "Quetta", "Sialkot", 
        "Gujranwala", "Mardan", "Abbottabad", "Dera Ismail Khan", 
        "Swat", "Nowshera", "Charsadda", "Haripur", "Bannu", 
        "Kohat", "Batagram", "Karak", "Mansehra", "Shangla", 
        "Malakand", "Lower Dir", "Upper Dir", "Buner", 
        "Lakki Marwat", "Dera Ghazi Khan", "Nawabshah"
    ];

    return (
        <div className="flex flex-col text-black text-lg border-2 border-primary p-1 rounded-md space-y-3">
            <h3 className="font-semibold text-gray-800 text-center">Browse by Category</h3>

            <div className="grid grid-cols-1 gap-4 mt-4 p-3">
                {/* Car Type Filters */}
                <button
                    className="bg-primary text-white py-2 rounded-md hover:bg-secondary"
                    onClick={() => handleRedirect('condition', 'new')}
                >
                    New Cars
                </button>
                <button
                    className="bg-primary text-white py-2 rounded-md hover:bg-secondary"
                    onClick={() => handleRedirect('condition', 'used')}
                >
                    Used Cars
                </button>

                {/* Brand Filters */}
                <button
                    className="bg-primary text-white py-2 rounded-md hover:bg-secondary"
                    onClick={() => handleRedirect('brand', 'honda')}
                >
                    Honda
                </button>
                <button
                    className="bg-primary text-white py-2 rounded-md hover:bg-secondary"
                    onClick={() => handleRedirect('brand', 'mercedes')}
                >
                    Mercedes
                </button>

                {/* Price Filters */}
                <button
                    className="bg-primary text-white py-2 rounded-md hover:bg-secondary"
                    onClick={() => handleRedirect('price', 'below-10000')}
                >
                    Below Rs.10,000/-
                </button>
                <button
                    className="bg-primary text-white py-2 rounded-md hover:bg-secondary"
                    onClick={() => handleRedirect('price', 'above-10000')}
                >
                    Above Rs.10,000/-
                </button>

                {/* Location Dropdown */}
                <div className="flex flex-col">
                    <select
                        className="bg-primary text-white py-2 rounded-md hover:bg-secondary appearance-none mb-2 text-center"
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                    >
                        <option value="">Select Location</option>
                        {districts.map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                    <button
                        className="bg-primary text-white py-2 rounded-md hover:bg-secondary"
                        onClick={handleLocationClick}
                    >
                        Apply Location Filter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeaderSidebar;
