'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { FaHome, FaUser, FaTable, FaBell, FaSignInAlt, FaUserPlus, FaCog, FaInfoCircle, FaQuestionCircle, FaMoon, FaSun } from 'react-icons/fa';

interface SidebarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
    const [theme, setTheme] = useState('light');
    const [showSettings, setShowSettings] = useState(false);
    const [activeLink, setActiveLink] = useState(''); // State to track active link
    const sidebarRef = useRef<HTMLDivElement>(null); // Reference for sidebar
    const settingsRef = useRef<HTMLDivElement>(null); // Reference for the popup
    const router = useRouter(); // Initialize Next.js router

    useEffect(() => {
        // Event listener to handle clicks outside the sidebar and settings popup
        const handleClickOutside = (event: MouseEvent) => {
            // Close sidebar if clicked outside sidebar
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isSidebarOpen) {
                toggleSidebar();
            }

            // Close settings popup if clicked outside settings popup
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node) && showSettings) {
                setShowSettings(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen, showSettings, toggleSidebar]); // Re-run when `isSidebarOpen`, `showSettings`, or `toggleSidebar` changes

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

    // Function to handle link click and set the active link
    const handleLinkClick = (link: string) => {
        setActiveLink(link); // Set the clicked link as the active link
    };

    const navigateTo = (path: string, link: string) => {
        handleLinkClick(link); // Set active link state
        router.push(path); // Use Next.js router to push routes without reloading
    };

    return (
        <aside
            ref={sidebarRef} // Attach ref to sidebar
            className={`absolute top-3 left-3 h-[calc(100vh-1.5rem)] w-64 flex flex-col border border-gray-700 rounded-lg p-4 z-100 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } sm:relative sm:translate-x-0`}
        >
            {/* Close Sidebar Button for Mobile */}
            <span className="sm:hidden p-4 text-right">
                <button onClick={toggleSidebar} className="text-xl">
                    ✕
                </button>
            </span>

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
                ><a onClick={() => navigateTo('/', 'home')}>Chat CANE</a>
                </h1>
            </span>

            {/* Sign option */}
            <nav className="flex-grow space-y-4 text-base">
                <h2 className="text-xs font-semibold uppercase">Sign option</h2>
                <button
                    onClick={() => navigateTo('/login', 'login')}
                    className={`flex items-center px-4 py-2 rounded-md w-full text-left ${activeLink === 'login' ? 'bg-green-500 text-white' : ''}`} // Change background for active link
                >
                    <FaSignInAlt className="mr-3 text-lg" />
                    Login
                </button>
                <button
                    onClick={() => navigateTo('/signup', 'signup')}
                    className={`flex items-center px-4 py-2 rounded-md w-full text-left ${activeLink === 'signup' ? 'bg-green-500 text-white' : ''}`} // Change background for active link
                >
                    <FaUserPlus className="mr-3 text-lg" />
                    Sign Up
                </button>

                {/* History */}
                <h2 className="mt-8 text-xs font-semibold uppercase">History</h2>
                <a
                    href="#dashboard"
                    onClick={() => handleLinkClick('dashboard')}
                    className={`flex items-center px-4 py-2 rounded-md ${activeLink === 'dashboard' ? 'bg-blue-500 text-white' : ''}`}
                >
                    <FaHome className="mr-3 text-lg" />
                    Dashboard
                </a>
                <a
                    href="#profile"
                    onClick={() => handleLinkClick('profile')}
                    className={`flex items-center px-4 py-2 rounded-md ${activeLink === 'profile' ? 'bg-blue-500 text-white' : ''}`}
                >
                    <FaUser className="mr-3 text-lg" />
                    Profile
                </a>
                <a
                    href="#tables"
                    onClick={() => handleLinkClick('tables')}
                    className={`flex items-center px-4 py-2 rounded-md ${activeLink === 'tables' ? 'bg-blue-500 text-white' : ''}`}
                >
                    <FaTable className="mr-3 text-lg" />
                    Tables
                </a>
                <a
                    href="#notifications"
                    onClick={() => handleLinkClick('notifications')}
                    className={`flex items-center px-4 py-2 rounded-md ${activeLink === 'notifications' ? 'bg-blue-500 text-white' : ''}`}
                >
                    <FaBell className="mr-3 text-lg" />
                    Notifications
                </a>
            </nav>

            {/* Footer Links */}
            <nav className="space-y-2 mt-auto">
                <a
                    href="#help"
                    onClick={() => handleLinkClick('help')}
                    className={`flex items-center px-4 py-2 rounded-md ${activeLink === 'help' ? 'bg-blue-500 text-white' : ''}`}
                >
                    <FaQuestionCircle className="mr-3 text-lg" />
                    Help
                </a>
                <a
                    href="#about"
                    onClick={() => handleLinkClick('about')}
                    className={`flex items-center px-4 py-2 rounded-md ${activeLink === 'about' ? 'bg-blue-500 text-white' : ''}`}
                >
                    <FaInfoCircle className="mr-3 text-lg" />
                    About Us
                </a>
                <a
                    onClick={() => {
                        handleLinkClick('settings');
                        toggleSettingsPopup();
                    }}
                    className={`flex items-center px-4 py-2 rounded-md cursor-pointer ${activeLink === 'settings' ? 'bg-blue-500 text-white' : ''}`}
                >
                    <FaCog className="mr-3 text-lg" />
                    Settings
                </a>
            </nav>

            {/* Settings Popup */}
            {showSettings && (
                <div ref={settingsRef} className="fixed bottom-8 left-8 p-4 rounded-lg shadow-lg w-52 border-2 border-blue-500">
                    <div className="flex items-center justify-between">
                        <span className="flex items-center">
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
                            <div className="w-11 h-6 bg-gray-300 rounded-full peer dark:bg-blue-600 peer-checked:bg-blue-600 peer-checked:after:bg-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-black after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                    </div>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
