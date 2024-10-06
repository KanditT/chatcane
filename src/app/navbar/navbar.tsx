'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import "../globals.css";
import Image from 'next/image';
import cclogo from '/images/cclogo.png';   // Light mode logo
import cclogol from '/images/cclogol.png'; // Dark mode logo
import { FaSignInAlt } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter(); // Initialize the router for navigation

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

  // Handle click for logo
  const handleLogoClick = () => {
    router.push('/'); // Navigate to the homepage
  };

  // Handle click for login
  const handleLoginClick = () => {
    router.push('/login'); // Navigate to the login page
  };

  return (
    <div className="fixed  top-3 justify-center sm:left-[calc(16rem+1.5rem)] w-full sm:w-[calc(100%-16rem-1.5rem)] sm:justify-between rounded-lg flex items-center p-4 h-16">
      {/* Breadcrumb / Page Title */}
      <div className="flex justify-center sm:justify-start space-x-2">
        <span className="relative h-12 w-12 mx-auto sm:mx-0"> {/* Adjust container size */}
          <button onClick={handleLogoClick} className="w-full h-full"> {/* Add onClick to navigate */}
            <Image
              src={isDarkMode ? cclogol : cclogo}  // Dynamic image based on theme
              alt="Logo"
              fill  // Using 'fill' to fill the container
              style={{ objectFit: 'contain' }}  // Ensure logo fits within the container
            />
          </button>
        </span>
        {/* Optional text can be shown on larger screens */}
      </div>

      {/* Right Aligned Navbar Items */}
      <div className="flex flex-col justify-end space-x-6 sm:justify-between">
        <button onClick={handleLoginClick} className="flex text-gray-500 hover:text-gray-700">
          <FaSignInAlt className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
