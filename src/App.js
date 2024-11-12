import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import AddCar from './pages/AddCar';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import ProductsPage from './pages/ProductsPage';
import Footer from './Components/Footer';
import AboutUs from './pages/AboutUs';
import RentalRequests from './pages/RentalRequests';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addCar" element={<AddCar />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-bookings" element={<Bookings />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/requests" element={<RentalRequests />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
