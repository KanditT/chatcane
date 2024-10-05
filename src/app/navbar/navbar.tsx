'use client';

import React, { useState, useEffect } from 'react';
import "../globals.css";
import Image from 'next/image';
import cclogo from '/images/cclogo.png';   // Light mode logo
import cclogol from '/images/cclogol.png'; // Dark mode logo
import { FaSearch, FaSignInAlt, FaBell, FaCog } from 'react-icons/fa';

const Navbar: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Use useEffect to detect theme changes
    useEffect(() => {
        // Detect if the 'dark' class is applied to the document element (html tag)
        const themeCheck = () => {
            const darkModeEnabled = document.documentElement.classList.contains('dark');
            setIsDarkMode(darkModeEnabled);
        };

        themeCheck(); // Run once when component mounts

        // Optional: Add an event listener to handle theme changes dynamically
        const observer = new MutationObserver(() => {
            themeCheck(); // Run every time there's a change in the class list on the html element
        });

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        // Cleanup the observer when component unmounts
        return () => observer.disconnect();
    }, []);

    return (
        <div className="navcolor fixed top-3 left-[calc(16rem+1.5rem)] w-[calc(100%-16rem-1.5rem)] rounded-lg flex items-center justify-between p-4 z-10 h-16">
            {/* Breadcrumb / Page Title */}
            <span className="text-gray-500 flex items-center space-x-2">
                <span className="relative h-12 w-12"> {/* Adjust container size */}
                    <Image 
                        src={isDarkMode ? cclogol : cclogo}  // Dynamic image based on theme
                        alt="Logo" 
                        fill  // Using 'fill' to fill the container
                        style={{ objectFit: 'contain' }}  // Ensure logo fits within the container
                    />
                </span>
                <span className="font-light">Chat</span> / <span className="font-semibold">Q1</span>
            </span>
    
      {/* Right Aligned Navbar Items */}
      <div className="flex items-center space-x-6">
        {/* Search Box */}
        {/* <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border rounded-md text-sm focus:outline-none"
          />
          <FaSearch className="absolute top-3 right-3 text-gray-400" />
        </div> */}

        {/* Icons */}
        <a href="#signin" className="text-gray-500 hover:text-gray-700">
          <FaSignInAlt className="text-xl" />
        </a>
        {/* <a href="#notifications" className="text-gray-500 hover:text-gray-700">
          <FaBell className="text-xl" />
        </a>
        <a href="#settings" className="text-gray-500 hover:text-gray-700">
          <FaCog className="text-xl" />
        </a> */}
      </div>
    </div>
  );
};

export default Navbar;
