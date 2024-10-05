'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FaHome, FaUser, FaTable, FaBell, FaSignInAlt, FaUserPlus, FaCog, FaInfoCircle, FaQuestionCircle, FaMoon, FaSun} from 'react-icons/fa';


const Sidebar: React.FC = () => {
    const [theme, setTheme] = useState('light');
    const [showSettings, setShowSettings] = useState(false);
    const settingsRef = useRef<HTMLDivElement>(null); // Reference for the popup

    useEffect(() => {
        if (document.documentElement.classList.contains('dark')) {
            setTheme('dark');
        }

        // Event listener to handle clicks outside the popup
        const handleClickOutside = (event: MouseEvent) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setShowSettings(false);
            }
        };

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            setTheme('light');
        } else {
            document.documentElement.classList.add('dark');
            setTheme('dark');
        }
    };

    const toggleSettingsPopup = () => {
        setShowSettings(!showSettings);
    };

    return (
        <aside className="absolute top-3 left-3 h-[calc(100vh-1.5rem)] w-64  flex flex-col border border-gray-700 rounded-lg p-4">
            {/* Sidebar Header */}
            <span className="flex items-end justify-center h-12 mb-4">
                <h1
                    className="text-transparent bg-clip-text text-4xl font-bold"
                    style={{
                        fontFamily: "'Comic Sans MS', cursive",
                        background: 'linear-gradient(to right, #f7f70e, #ffff66, #a3ff33, #64ffaa, #64ffdb, #64f0ff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Chat CANE
                </h1>
            </span>

            {/* Sign option */}
            <nav className="flex-grow space-y-4 text-base"><h2 className="text-xs font-semibold uppercase">Sign option</h2>
                <a href="/chatSection" className="flex items-center px-4 py-2 rounded-md">
                    <FaSignInAlt className="mr-3 text-lg" />
                    Sign In
                </a>
                <a href="/navbar" className="flex items-center px-4 py-2 rounded-md">
                    <FaUserPlus className="mr-3 text-lg" />
                    Sign Up
                </a>

                {/* History*/}
                <nav className=" mt-8 space-y-2">
                    <h2 className="text-xs font-semibold uppercase">history</h2>
                    <a href="#dashboard" className="flex items-center px-4 py-2 rounded-md">
                        <FaHome className="mr-3 text-lg" />
                        Dashboard
                    </a>
                    <a href="#profile" className="flex items-center px-4 py-2 rounded-md">
                        <FaUser className="mr-3 text-lg" />
                        Profile
                    </a>
                    <a href="#tables" className="flex items-center px-4 py-2 rounded-md">
                        <FaTable className="mr-3 text-lg" />
                        Tables
                    </a>
                    <a href="#notifications" className="flex items-center px-4 py-2 rounded-md">
                        <FaBell className="mr-3 text-lg" />
                        Notifications
                    </a>

                </nav>
            </nav>

            {/* Footer Links */}
            <nav className="space-y-2 mt-auto">
                <a href="#help" className="flex items-center px-4 py-2  rounded-md">
                    <FaQuestionCircle className="mr-3 text-lg" />
                    Help
                </a>
                <a href="#about" className="flex items-center px-4 py-2 rounded-md">
                    <FaInfoCircle className="mr-3 text-lg" />
                    About Us
                </a>
                <a onClick={toggleSettingsPopup} className="flex items-center px-4 py-2  rounded-md cursor-pointer">
                    <FaCog className="mr-3 text-lg" />
                    Settings
                </a>
            </nav>

            {/* Settings Popup */}
            {showSettings && (
                <div ref={settingsRef} className="fixed bottom-16 left-16  p-4 rounded-lg shadow-lg w-52 border-2 border-blue-500">
                    <div className="flex items-center justify-between">
                    <span className="flex items-center">
    {/* Conditional rendering for icon and text based on theme */}
    {theme === 'dark' ? (
        <>
            <FaSun className="mr-2" /> {/* Sun icon for light mode */}
            Light Mode
        </>
    ) : (
        <>
            <FaMoon className="mr-2" /> {/* Moon icon for dark mode */}
            Dark Mode
        </>
    )}
</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={theme === 'dark'} onChange={toggleTheme} />
                            <div className="w-11 h-6 bg-gray-300 rounded-full peer dark:bg-blue-600 peer-checked:bg-blue-600 peer-checked:after:bg-white  after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-black after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                    </div>
                </div>
            )}
        </aside>
    );
};
export default Sidebar;
