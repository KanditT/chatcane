import React from 'react';
import "../globals.css";
import Image from 'next/image';
import cclogo from '/images/cclogo.png';
import { FaSearch, FaSignInAlt, FaBell, FaCog } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <div className="navcolor fixed top-3 left-[calc(16rem+1.5rem)] w-[calc(100%-16rem-1.5rem)] rounded-lg flex items-center justify-between p-4 z-10 h-16">
      {/* Breadcrumb / Page Title */}
      <span className="text-gray-500 flex items-center space-x-2">
        <span className="relative h-12 w-12"> {/* Adjust container size */}
          <Image 
            src={cclogo} 
            alt="Logo" 
            layout="fill" // Fill the container
            objectFit="contain" // Ensure the logo fits within the container
          />
        </span>
        {/* <span className="font-light">Dashboard</span> / <span className="font-semibold">Home</span> */}
      </span>
    
      {/* Right Aligned Navbar Items */}
      <div className="flex items-center space-x-6">
        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border rounded-md text-sm focus:outline-none"
          />
          <FaSearch className="absolute top-3 right-3 text-gray-400" />
        </div>

        {/* Icons */}
        <a href="#signin" className="text-gray-500 hover:text-gray-700">
          <FaSignInAlt className="text-xl" />
        </a>
        <a href="#notifications" className="text-gray-500 hover:text-gray-700">
          <FaBell className="text-xl" />
        </a>
        <a href="#settings" className="text-gray-500 hover:text-gray-700">
          <FaCog className="text-xl" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
