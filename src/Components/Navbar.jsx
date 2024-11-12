import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('CarUser');

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/api/user/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        console.log(response)
        setUser(response.data.data.user.name); // Assuming the response has user data with a 'name' property
      })
      .catch(error => {
        console.error("Failed to fetch user details", error);
        localStorage.removeItem('CarToken'); // Clear invalid token
      });
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('CarUser');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className='bg-primary text-white mx-20 p-4 flex justify-between items-center'>   
      <div className='px'>
        <Link to='/' className='text-xl font-bold'>RentCar</Link>
      </div>
      <div className='space-x-6 text-lg font-medium'>
        <Link to="/">Home</Link>
        <Link to="/products">See Cars</Link>
        <Link to="/addCar">List Cars</Link>
        <Link to="/my-bookings">My Bookings</Link>
        <Link to="/requests">Rental Requests</Link>
        <Link to="/about">About</Link>
      </div>
      <div className='space-x-6 font-medium text-lg'>
        {user ? (
          <>
            <Link to='/profile'>Welcome, {user}</Link>
            <button onClick={handleLogout} className="text-lg bg-secondary px-4 py-2 rounded-md">Logout</button>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
