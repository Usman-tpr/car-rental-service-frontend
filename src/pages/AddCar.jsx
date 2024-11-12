import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddCar = () => {
  const [carData, setCarData] = useState({
    images: [],
    description: '',
    brand: '',
    model: '',
    price: '',
    condition: '',
    location: '',
    phone: ''
  });

  const [models, setModels] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Update models only when the brand changes
    if (name === 'brand') {
      updateModels(value);
      // Reset the model when brand changes
      setCarData((prevData) => ({
        ...prevData,
        model: '', // Reset model when brand changes
      }));
    }
  };

  const updateModels = (selectedBrand) => {
    const brandModels = {
      Toyota: ['Camry', 'Corolla', 'Fortuner'],
      Honda: ['Civic', 'Accord', 'HR-V'],
      Ford: ['Mustang', 'F-150', 'Explorer'],
      BMW: ['X5', '3 Series', 'Z4'],
      Mercedes: ['C-Class', 'E-Class', 'GLA'],
      Audi: ['A3', 'A4', 'Q5'],
      Tesla: ['Model S', 'Model 3', 'Model X'],
      Nissan: ['Altima', 'Sentra', 'Rogue'],
    };

    setModels(brandModels[selectedBrand] || []);
  };

  const handleImageChange = (e) => {
    setCarData({ ...carData, images: [...e.target.files] });
  };

  const token = localStorage.getItem('CarUser');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!carData.description  || !carData.brand || !carData.model || !carData.price || !carData.condition || !carData.location){
     return toast.error("Please Fill All the fields");

    }
    const formData = new FormData();

    carData.images.forEach((image) => {
      formData.append('images', image);
    });
    formData.append('description', carData.description);
    formData.append('brand', carData.brand);
    formData.append('model', carData.model);
    formData.append('price', carData.price);
    formData.append('condition', carData.condition);
    formData.append('location', carData.location);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/cars/add',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success('Car added successfully!');
        navigate("/");
      }
    } catch (error) {
      console.error('Error adding car:', error);
      toast.error('Failed to add car.');
    }
  };

  if (!token) {
    return (
      <div className="mx-20 my-10 p-5 bg-red-100 border border-red-400 text-red-700 rounded-md">
        <p>User not authenticated. Please log in.</p>
      </div>
    );
  }

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
    <>
      <div className="mx-20 my-10 bg-cover bg-center h-80 flex items-center justify-center text-center bg-gray-800 rounded-md shadow-md text-white relative overflow-hidden" style={{ backgroundImage: "url('/path/to/hero-image.jpg')" }}>
        <motion.div
          className="text-4xl font-bold uppercase z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Post New Ad
        </motion.div>
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      </div>
      <div className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-md">
        <ToastContainer />
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Image Upload */}
          <label className="block">
            <span className="text-gray-700">Upload Images</span>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleImageChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </label>

          {/* Description */}
          <label className="block">
            <span className="text-gray-700">Description</span>
            <textarea
              name="description"
              value={carData.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              placeholder="Describe your car..."
            />
          </label>

          {/* Brand Dropdown */}
          <label className="block">
            <span className="text-gray-700">Brand</span>
            <select
              name="brand"
              value={carData.brand}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Brand</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
              <option value="Ford">Ford</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes">Mercedes</option>
              <option value="Audi">Audi</option>
              <option value="Tesla">Tesla</option>
              <option value="Nissan">Nissan</option>
              {/* Add more brands as needed */}
            </select>
          </label>

          {/* Model Dropdown */}
          <label className="block">
            <span className="text-gray-700">Model</span>
            <select
              name="model"
              value={carData.model}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              disabled={models.length === 0} // Disable if no models are available
            >
              <option value="">Select Model</option>
              {models.map((model, index) => (
                <option key={index} value={model}>{model}</option>
              ))}
            </select>
          </label>

          {/* Price */}
          <label className="block">
            <span className="text-gray-700">Price (per day)</span>
            <input
              type="number"
              name="price"
              value={carData.price}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter price per day"
            />
          </label>

          {/* Condition */}
          <label className="block">
            <span className="text-gray-700">Condition</span>
            <select
              name="condition"
              value={carData.condition}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Condition</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </label>

          {/* Phone */}
          <label className="block">
            <span className="text-gray-700">Phone</span>
            <input
              type="text"
              name="phone"
              value={carData.phone}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your phone number"
            />
          </label>

          {/* Location */}
          <label className="block">
            <span className="text-gray-700">Location</span>
            <select
              name="location"
              value={carData.location}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Location</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>{district}</option>
              ))}
            </select>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCar;
