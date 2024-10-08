'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "../globals.css";
import Image from 'next/image';
import cclogo from '/images/cclogo.png'; // Light mode logo
import cclogol from '/images/cclogol.png'; // Dark mode logo
import { FaSignInAlt } from 'react-icons/fa';

interface NavbarProps {
  isSidebarCollapsed: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isSidebarCollapsed }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

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

  return (
    <div
      className={`z-20 fixed top-3 justify-center ${isSidebarCollapsed ? 'sm:left-[5rem] sm:w-[calc(100%-5rem-1.5rem)]' : 'sm:left-[calc(16rem+1.5rem)] sm:w-[calc(100%-16rem-3rem)]'} w-full  sm:justify-between rounded-lg flex items-center p-4 h-16 transition-all duration-300`}
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
      <div className="flex flex-col justify-end space-x-6 sm:justify-between">
        <button onClick={handleLoginClick} className=" flex text-gray-500 hover:text-gray-700">
          <FaSignInAlt className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
