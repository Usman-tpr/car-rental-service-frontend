import React from 'react';
import { motion } from 'framer-motion'; // Animation library for scroll effects

const AboutUs = () => {
  return (
    <div className="mx-20 my-10 ">
      {/* Hero Section */}
      <div className="bg-cover bg-center h-80 flex items-center justify-center text-center bg-gray-800 rounded-md shadow-md text-white relative overflow-hidden" style={{ backgroundImage: "url('/path/to/hero-image.jpg')" }}>
        <motion.div
          className="text-4xl font-bold uppercase z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Us
        </motion.div>
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      </div>

      {/* Mission Section */}
      <motion.section
        className="my-16"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-semibold text-primary text-center mb-5">Our Mission</h2>
        <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
          At Car Rentals Inc., we aim to provide the best car rental experience with a wide range of high-quality vehicles, exceptional customer service, and affordable rates. We believe in delivering comfort, style, and reliability to every client, wherever the road may lead.
        </p>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="my-16"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-semibold text-primary text-center mb-5">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-10">
          {['Team Member 1', 'Team Member 2', 'Team Member 3', 'Team Member 4'].map((member, idx) => (
            <div key={idx} className="max-w-xs w-full bg-white rounded-md shadow-md p-5 text-center">
              <img src={`/path/to/team${idx + 1}.jpg`} alt={`${member}`} className="w-32 h-32 mx-auto rounded-full mb-4 shadow-lg" />
              <h3 className="text-xl font-medium text-gray-800">{member}</h3>
              <p className="text-gray-500">Position</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Cars Section */}
      <motion.section
        className="my-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-semibold text-primary text-center mb-5">Our Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {['car1.jpg', 'car2.jpg', 'car3.jpg', 'car4.jpg'].map((carImage, idx) => (
            <div key={idx} className="relative overflow-hidden rounded-md shadow-lg">
              <img src={`/path/to/${carImage}`} alt={`Car ${idx + 1}`} className="w-full h-48 object-cover transition-transform duration-500 transform hover:scale-105" />
            </div>
          ))}
        </div>
      </motion.section>

      {/* History Section */}
      <motion.section
        className="my-16"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-semibold text-primary text-center mb-5">Our History</h2>
        <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
          Established in 2010, Car Rentals Inc. began with a single location and a small fleet of vehicles. Over the years, we have expanded to multiple locations nationwide, providing a diverse selection of vehicles for various travel needs. Our dedication to quality and customer satisfaction has made us a trusted name in car rentals.
        </p>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        className="my-16 bg-gray-200 py-10 rounded-md shadow-inner"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-semibold text-primary text-center mb-5">Contact Us</h2>
        <p className="text-center text-gray-700 mb-8">We'd love to hear from you! Reach out for any queries or feedback.</p>
        <div className="flex flex-col items-center">
          <div className="flex space-x-8 mb-5">
            <div>
              <h4 className="font-semibold text-gray-800">Email:</h4>
              <p className="text-gray-600">info@carrentalsinc.com</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Phone:</h4>
              <p className="text-gray-600">+123-456-7890</p>
            </div>
          </div>
          <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300">
            Send a Message
          </button>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;
