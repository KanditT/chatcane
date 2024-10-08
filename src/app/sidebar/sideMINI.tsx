'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaSignInAlt, FaUserPlus, FaCog, FaInfoCircle, FaQuestionCircle, FaMoon, FaSun, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface SidebarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    isSidebarCollapsed: boolean;
    toggleSidebarCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar, isSidebarCollapsed, toggleSidebarCollapse }) => {
    const [theme, setTheme] = useState('light');
    const [showSettings, setShowSettings] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const sidebarRef = useRef<HTMLDivElement>(null);
    const settingsRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isSidebarOpen) {
                toggleSidebar();
            }

            if (settingsRef.current && !settingsRef.current.contains(event.target as Node) && showSettings) {
                setShowSettings(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen, showSettings, toggleSidebar]);

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

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    const navigateTo = (path: string, link: string) => {
        handleLinkClick(link);
        router.push(path);
    };

    return (
        <div
            ref={sidebarRef}
            className={`absolute top-3 left-3 h-[calc(100vh-1.5rem)] ${isSidebarCollapsed ? 'w-16' : 'w-64'} flex flex-col border border-gray-700 rounded-lg p-4 z-100 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:relative sm:translate-x-0`}
        >
            <span className="sm:hidden p-2 text-right w-full">
                <button onClick={toggleSidebar} className="text-xl">
                    ✕
                </button>
            </span>

            <button onClick={toggleSidebarCollapse} className="mb-4 mt-2 text-xl hidden sm:block">
                {isSidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
            <span className={`flex items-end justify-center h-12 mb-4 ${isSidebarCollapsed ? 'hidden' : ''}`}>
                <h1
                    className="text-transparent bg-clip-text text-4xl font-bold"
                    style={{
                        fontFamily: "'Comic Sans MS', cursive",
                        background: 'linear-gradient(to right, #f7f70e, #ffff66, #a3ff33, #64ffaa, #64ffdb, #64f0ff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    <a onClick={() => navigateTo('/', 'home')}>Chat CANE</a>
                </h1>
            </span>

            <nav className={`flex-grow space-y-4 ${isSidebarCollapsed ? 'text-xs' : 'text-base'} mt-8`}>
                {!isSidebarCollapsed && <h2 className="text-xs font-semibold uppercase">Sign option</h2>}
                <button
                    onClick={() => navigateTo('/login', 'login')}
                    className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'px-4'} py-2 rounded-md w-full ${activeLink === 'login' ? 'bg-green-500 text-white' : ''}`}
                >
                    <FaSignInAlt className="mr-3 text-lg" />
                    {!isSidebarCollapsed && 'Login'}
                </button>
                <button
                    onClick={() => navigateTo('/signup', 'signup')}
                    className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'px-4'} py-2 rounded-md w-full ${activeLink === 'signup' ? 'bg-green-500 text-white' : ''}`}
                >
                    <FaUserPlus className="mr-3 text-lg" />
                    {!isSidebarCollapsed && 'Sign Up'}
                </button>

                {!isSidebarCollapsed && <h2 className="mt-8 text-xs font-semibold uppercase">History</h2>}
                <button
                    onClick={() => navigateTo('/', 'home')}
                    className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'px-4'} py-2 rounded-md w-full ${activeLink === 'home' ? 'bg-blue-500 text-white' : ''}`}
                >
                    <FaHome className="mr-3 text-lg" />
                    {!isSidebarCollapsed && 'Dashboard'}
                </button>
            </nav>

            <nav className={`space-y-2 mt-auto ${isSidebarCollapsed ? 'text-xs' : 'text-base'}`}>
                <button
                    onClick={() => handleLinkClick('help')}
                    className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'px-4'} py-2 rounded-md w-full ${activeLink === 'help' ? 'bg-blue-500 text-white' : ''}`}
                >
                    <FaQuestionCircle className="mr-3 text-lg" />
                    {!isSidebarCollapsed && 'Help'}
                </button>
                <button
                    onClick={() => handleLinkClick('about')}
                    className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'px-4'} py-2 rounded-md w-full ${activeLink === 'about' ? 'bg-blue-500 text-white' : ''}`}
                >
                    <FaInfoCircle className="mr-3 text-lg" />
                    {!isSidebarCollapsed && 'About Us'}
                </button>
                <button
                    onClick={() => {
                        handleLinkClick('settings');
                        toggleSettingsPopup();
                    }}
                    className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'px-4'} py-2 rounded-md cursor-pointer w-full ${activeLink === 'settings' ? 'bg-blue-500 text-white' : ''}`}
                >
                    <FaCog className="mr-3 text-lg" />
                    {!isSidebarCollapsed && 'Settings'}
                </button>
            </nav>

            {showSettings && (
                <div ref={settingsRef} className="fixed bottom-16 left-20 p-4 rounded-lg shadow-lg w-52 border-2 border-blue-500 bg-white dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                        <span className="flex items-center">
                            {theme === 'dark' ? (
                                <>
                                    <FaSun className="mr-2" />
                                    Light Mode
                                </>
                            ) : (
                                <>
                                    <FaMoon className="mr-2" />
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
        </div>
    );
};

export default Sidebar;
