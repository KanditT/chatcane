'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "../globals.css";
import Image from 'next/image';
import cclogo from '/images/cclogo.png'; // Light mode logo
import cclogol from '/images/cclogol.png'; // Dark mode logo
import { FaSignInAlt, FaUserCircle } from 'react-icons/fa';
import { useUser } from '../userState';

interface NavbarProps {
  isSidebarCollapsed: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isSidebarCollapsed }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const router = useRouter();
  const { user, setUserHandle } = useUser();

  useEffect(() => {
    const themeCheck = () => {
      const darkModeEnabled = document.documentElement.classList.contains('dark');
      setIsDarkMode(darkModeEnabled);
    };

    themeCheck();

    const observer = new MutationObserver(() => {
      themeCheck();
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleProfileClick = () => {
    setIsLogoutVisible(!isLogoutVisible);
  };

  const handleLogout = () => {
    setUserHandle(''); // Clear user state
    localStorage.removeItem('user'); // Remove user from localStorage
    setIsLogoutVisible(false); // Close the logout pop-up
    window.location.href = "/login";
  };

  return (
    <div
      className={`z-20 fixed top-3 justify-center ${isSidebarCollapsed ? 'sm:left-[5rem] sm:w-[calc(100%-5rem-1.5rem)]' : 'sm:left-[calc(16rem+1.5rem)] sm:w-[calc(100%-16rem-3rem)]'} w-full sm:justify-between rounded-lg flex items-center p-4 h-16 transition-all duration-300`}
    >
      {/* Breadcrumb / Page Title */}
      <div className="flex justify-center sm:justify-start space-x-2">
        <span className="relative h-12 w-12 mx-auto sm:mx-0">
          <button onClick={handleLogoClick} className="w-full h-full">
            <Image
              src={isDarkMode ? cclogol : cclogo}
              alt="Logo"
              fill
              style={{ objectFit: 'contain' }}
            />
          </button>
        </span>
      </div>

      {/* Right Aligned Navbar Items */}
      <div className="flex-col justify-end space-x-6 sm:justify-between hidden sm:flex relative">
        {!user ? (
          // Show login button when user is not logged in
          <button onClick={handleLoginClick} className="text-gray-500 hover:text-gray-700 hidden">
            <FaSignInAlt className="text-xl" />
          </button>
        ) : (
          // Show user profile icon when user is logged in
          <div className="relative">
            <button onClick={handleProfileClick} className="flex   text-gray-500 hover:text-gray-700">
              <FaUserCircle  style={{ width: '35px', height: '35px' }} className="text-xl " />
            </button>

            {/* Logout Pop-up */}
            {isLogoutVisible && (
              <div className="absolute right-0 mt-2 w-40 bg-white  shadow-lg rounded-md p-2">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-2 py-1 text-gray-600 hover:bg-red-300 hover:text-black rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
