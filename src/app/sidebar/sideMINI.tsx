'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaSignInAlt, FaUserPlus, FaCog, FaInfoCircle, FaQuestionCircle, FaMoon, FaSun, FaChevronLeft, FaChevronRight, FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';
import yanasorn from '/images/yanasorn.jpg';
import apiwat from '/images/apiwat.jpg';
import kandit from '/images/kandit.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useUser } from '../userState';


interface SidebarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    isSidebarCollapsed: boolean;
    toggleSidebarCollapse: () => void;
}

// if (user !== null) {
// console.log("Welcome, ", user);
// } else {
// console.log("No user is logged in.");
// }
const teamMembers = [
    {
        name: "Apiwat Chakunchon",
        githubUrl: "https://github.com/apiwatfresh",
        githubUsername: "GuildZ",
        stuID: "653040465-3",
        instagramUrl: "https://www.instagram.com/gz.fresh.10/",
        instagramUsername: "gz.fresh.10",
        profileImage: apiwat,
    },
    {
        name: "Kandit Tanthanathewin",
        githubUrl: "https://github.com/KanditT",
        githubUsername: "KanditT",
        stuID: "653040617-6",
        instagramUrl: "https://www.instagram.com/kandis0123/",
        instagramUsername: "kandis0123",
        profileImage: kandit,
    },
    {
        name: "Yanasorn Wongpakdee",
        githubUrl: "https://github.com/yanasorn2003",
        githubUsername: "Yanasorn2003",
        stuID: "653040619-2",
        instagramUrl: "https://www.instagram.com/early07_00/",
        instagramUsername: "early07_00",
        profileImage: yanasorn,
    },
];

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar, isSidebarCollapsed, toggleSidebarCollapse }) => {
    const [theme, setTheme] = useState('light');
    const [showSettings, setShowSettings] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const settingsRef = useRef<HTMLDivElement>(null);
    const aboutModalRef = useRef<HTMLDivElement>(null);
    const helpModalRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [isEnglish, setIsEnglish] = useState(true);

    const { user, setUserHandle, logout } = useUser();

    useEffect(() => {
        console.log("useEffect in Sidebar is called"); // Debugging line
        if (user) {
            console.log("User logged in:", user);
        }
    }, [user]);
    const handleLogout = () => {
        // Clear the user state and localStorage on logout
        setUserHandle(''); // Or set it to null if preferred
        localStorage.removeItem('user');
        // const mode = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        // router.push('/login');
        // setTheme(mode);
        logout()
        router.push('/login');
    };



    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Close Sidebar if clicked outside
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isSidebarOpen) {
                toggleSidebar();
            }

            // Close Settings Popup if clicked outside
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node) && showSettings) {
                setShowSettings(false);
            }

            // Close About Modal if clicked outside
            if (isAboutModalOpen && aboutModalRef.current && !aboutModalRef.current.contains(event.target as Node)) {
                setIsAboutModalOpen(false);
            }

            if (isHelpModalOpen && helpModalRef.current && !helpModalRef.current.contains(event.target as Node)) {
                setIsHelpModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen, showSettings, isAboutModalOpen, isHelpModalOpen, toggleSidebar]);


    const toggleTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            setTheme('light');
        } else {
            document.documentElement.classList.add('dark');
            setTheme('dark');
        }
    };

    const toggleLanguage = () => {
        setIsEnglish(!isEnglish);
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

    const toggleAboutModal = () => {
        setIsAboutModalOpen(!isAboutModalOpen);
    };

    const toggleHelpModal = () => {
        setIsHelpModalOpen(!isHelpModalOpen);
    }

    const handleLogoClick = () => {
        router.push('/');
    };

    return (
        <div>
            <div
                ref={sidebarRef}
                className={`aside absolute top-3 left-3 h-[calc(100vh-1.5rem)] ${isSidebarCollapsed ? 'w-16' : 'w-64'} flex flex-col rounded-lg p-4 z-100 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:relative sm:translate-x-0 duration-300 ease-in-out`}
            >
                <span className="sm:hidden p-2 text-right w-full">
                    <button onClick={toggleSidebar} className="text-xl">
                        ✕
                    </button>
                </span>

                {/* Icon < and > */}
                <button
                    onClick={toggleSidebarCollapse}
                    className="mb-4 mt-2 text-xl hidden sm:flex items-center transition-transform duration-300 ease-in-out"
                >
                    <span
                        className="relative w-6 h-6 flex items-center justify-center"
                        style={{width: '24px', height: '24px'}}
                    >
                        <FaChevronRight
                            className={`absolute transition-opacity duration-300 ease-in-out ${isSidebarCollapsed ? 'opacity-100' : 'opacity-0'}`}
                        />
                        <FaChevronLeft
                            className={`absolute transition-opacity duration-300 ease-in-out ${isSidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}
                        />
                    </span>
                </button>

                {/*<span className={`rounded-xl flex items-center justify-center h-12 mb-4 ${isSidebarCollapsed ? 'hidden' : ''}`}>*/}
                {/*    <h1*/}
                {/*        className="titlecolor text-transparent bg-clip-text text-4xl font-bold"*/}
                {/*        style={{*/}
                {/*            fontFamily: "'Comic Sans MS', cursive",*/}
                {/*            ...(theme === 'dark'*/}
                {/*                ? {*/}
                {/*                    color: '#028482', // Solid color for better visibility in dark mode*/}
                {/*                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Shadow to enhance text appearance*/}
                {/*                }*/}
                {/*                : {*/}
                {/*                    background: 'linear-gradient(to right, #f7f70e, #ffff66, #a3ff33, #64ffaa, #64ffdb, #64f0ff)', // Light theme gradient*/}
                {/*                    WebkitBackgroundClip: 'text',*/}
                {/*                    WebkitTextFillColor: 'transparent',*/}
                {/*                }),*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <a onClick={() => navigateTo('/', 'home')}>Chat CANE</a>*/}
                {/*    </h1>*/}
                {/*</span>*/}

                <nav className={`flex-grow space-y-4 ${isSidebarCollapsed ? 'text-xs' : 'text-base'} mt-3`}>
                    {user === null ? (
                        <>
                            {/* Show Login and Sign Up when no user is logged in */}
                            {!isSidebarCollapsed && <h2 className="text-xs font-semibold uppercase">Sign Option</h2>}
                            <button
                                onClick={() => navigateTo('/login', 'login')}
                                className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'px-4'} py-2 rounded-md w-full ${activeLink === 'login' ? 'bg-green-500 text-white' : ''}`}
                            >
                                <FaSignInAlt className={`${isSidebarCollapsed ? 'mr-0' : 'mr-3'} text-lg`}/>
                                {!isSidebarCollapsed && 'Login'}
                            </button>
                            <button
                                onClick={() => navigateTo('/signup', 'signup')}
                                className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'px-4'} py-2 rounded-md w-full ${activeLink === 'signup' ? 'bg-blue-500 text-white' : ''}`}
                            >
                                <FaUserPlus className={`${isSidebarCollapsed ? 'mr-0' : 'mr-3'} text-lg`}/>
                                {!isSidebarCollapsed && 'Sign Up'}
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Show Dashboard and Logout when user is logged in */}

                            {!isSidebarCollapsed && <h2 className="text-xs font-semibold uppercase">Dashboard</h2>}
                            <button
                                onClick={() => navigateTo('/', 'home')}
                                className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'px-4'} py-2 rounded-md w-full ${activeLink === 'home' ? 'bg-gray-400 text-white' : ''}`}
                            >
                                <FaHome className={`${isSidebarCollapsed ? 'mr-0' : 'mr-3'} text-lg`}/>
                                {!isSidebarCollapsed && 'Dashboard'}
                            </button>

                        </>
                    )}
                </nav>
                <nav className={`space-y-2 mt-auto ${isSidebarCollapsed ? 'text-xs' : 'text-base'}`}>
                    <button
                        onClick={() => {
                            handleLinkClick('help');
                            toggleHelpModal();
                        }}
                        className={`flex items-center ${isSidebarCollapsed ? 'justify-center py-[calc(11px)]' : 'px-2'}  py-2 rounded-md w-full ${activeLink === 'help' ? 'bg-orange-400 text-white' : ''}`}
                    >
                        <FaQuestionCircle className={`${isSidebarCollapsed ? 'mr-0' : 'mr-3'} text-lg`}/>
                        {!isSidebarCollapsed && 'Help'}
                    </button>
                    <button
                        onClick={() => {
                            handleLinkClick('about');
                            toggleAboutModal();
                        }}
                        className={`flex items-center ${isSidebarCollapsed ? 'justify-center py-[calc(11px)]' : 'px-2'}  py-2 rounded-md w-full ${activeLink === 'about' ? 'bg-orange-400 text-white' : ''}`}
                    >
                        <FaInfoCircle className={`${isSidebarCollapsed ? 'mr-0' : 'mr-3'} text-lg`}/>
                        {!isSidebarCollapsed && 'About Us'}
                    </button>
                    <button
                        onClick={() => {
                            handleLinkClick('settings');
                            toggleSettingsPopup();
                        }}
                        className={`flex items-center  ${isSidebarCollapsed ? 'justify-center py-[calc(11px)]' : 'px-2'}  py-2 rounded-md cursor-pointer w-full ${activeLink === 'settings' ? 'bg-orange-400 text-white' : ''}`}
                    >
                        <FaCog className={`${isSidebarCollapsed ? 'mr-0' : 'mr-3'} text-lg`}/>
                        {!isSidebarCollapsed && 'Settings'}
                    </button>

                    <button
                        onClick={handleLogout}
                        className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'px-4'} py-2 rounded-md cursor-pointer w-full hover:bg-red-300 active:bg-red-500 hover:text-white`}
                    >
                        <FaSignOutAlt className={`${isSidebarCollapsed ? 'mr-0' : 'mr-3'} text-lg`}/>
                        {!isSidebarCollapsed && 'Logout'}
                    </button>
                </nav>

                {showSettings && (
                    <div ref={settingsRef}
                         className="fixed bottom-12 left-8 p-3 rounded-lg shadow-lg w-48 border-2 border-blue-500">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center">
                                {theme === 'dark' ? (
                                    <>
                                        <FaSun className="mr-2"/>
                                        Light Mode
                                    </>
                                ) : (
                                    <>
                                        <FaMoon className="mr-2"/>
                                        Dark Mode
                                    </>
                                )}
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={theme === 'dark'}
                                       onChange={toggleTheme}/>
                                <div
                                    className="w-11 h-6 bg-gray-300 rounded-full peer dark:bg-blue-600 peer-checked:bg-blue-600 peer-checked:after:bg-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-black after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                            </label>
                        </div>
                    </div>
                )}
            </div>


            {isHelpModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-hidden">
                    <div
                        ref={helpModalRef}
                        className="modal-content p-6 rounded-lg shadow-lg w-full max-w-sm max-h-[90vh] m-4 overflow-y-scroll no-scrollbar sm:max-w-xl dark:bg-[#e6dace]">
                        <div className="modal-header flex justify-between items-center mb-4 dark:bg-[#e6dace]">
                            <h5 className="modal-title font-bold text-3xl">
                                {isEnglish ? 'Help ' : 'ความช่วยเหลือ'}
                            </h5>
                            {/* Combined Close and Translate Button */}
                            <div className="flex items-center space-x-2 dark:bg-[#e6dace]">
                                {/* Translate Icon Button */}
                                <button
                                    type="button"
                                    className="text-2xl ml-2 px-2 py-1 bg-blue-500 text-white rounded-full "
                                    onClick={toggleLanguage}>
                                    🌐
                                </button>
                            </div>
                        </div>
                        <div className="modal-body p-4 rounded-lg dark:bg-[#f4ece7]">
                            <h6 className="font-semibold text-xl mb-3">
                                {isEnglish ? 'What Can I Help With?' : 'ฉันสามารถช่วยอะไรได้บ้าง?'}
                            </h6>
                            <p className="text-lg mb-6">
                                {isEnglish ?
                                    'Hello! I am your Sugarcane Assistant. You can ask me anything about sugarcane: cultivation, harvesting, uses, challenges, and much more!' :
                                    'สวัสดี! ฉันคือผู้ช่วยเกี่ยวกับอ้อยของคุณ คุณสามารถถามฉันได้ทุกอย่างเกี่ยวกับอ้อย: การปลูก การเก็บเกี่ยว การใช้ประโยชน์ ความท้าทาย และอื่นๆ อีกมากมาย!'
                                }
                            </p>

                            <h6 className="font-semibold text-xl mb-3">
                                {isEnglish ? 'Common Questions to Ask' : 'คำถามที่พบบ่อย'}
                            </h6>
                            <ul className="list-disc list-inside mb-6 text-lg">
                                <li>{isEnglish ? 'What are the main benefits of sugarcane?' : 'ประโยชน์หลักของอ้อยคืออะไร?'}</li>
                                <li>{isEnglish ? 'How is sugarcane cultivated?' : 'การปลูกอ้อยทำอย่างไร?'}</li>
                                <li>{isEnglish ? 'What are the pests that affect sugarcane?' : 'ศัตรูพืชที่มีผลต่ออ้อยคืออะไร?'}</li>
                                <li>{isEnglish ? 'What products are made from sugarcane?' : 'ผลิตภัณฑ์อะไรบ้างที่ทำจากอ้อย?'}</li>
                                <li>{isEnglish ? 'How can I improve sugarcane yield?' : 'ฉันสามารถเพิ่มผลผลิตอ้อยได้อย่างไร?'}</li>
                            </ul>

                            <h6 className="font-semibold text-xl mb-3">
                                {isEnglish ? 'How to Interact' : 'วิธีการโต้ตอบ'}
                            </h6>
                            <p className="text-lg mb-6">
                                {isEnglish ? (
                                    <>
                                        Here’s how to interact with me:
                                        <br/>
                                        - Type your question in the chatbox below.
                                        <br/>
                                        - Be as specific as possible if you need detailed information.
                                        <br/>
                                        - Try asking about different aspects of sugarcane if you want broader knowledge.
                                    </>
                                ) : (
                                    <>
                                        นี่คือวิธีการโต้ตอบกับฉัน:
                                        <br/>
                                        - พิมพ์คำถามของคุณลงในช่องแชทด้านล่าง
                                        <br/>
                                        - โปรดระบุรายละเอียดให้มากที่สุดหากต้องการข้อมูลเชิงลึก
                                        <br/>
                                        - ลองถามเกี่ยวกับด้านต่างๆ ของอ้อยหากต้องการความรู้ที่กว้างขึ้น
                                    </>
                                )}
                            </p>

                            <h6 className="font-semibold text-xl mb-3">
                                {isEnglish ? 'Topic Suggestions' : 'หัวข้อที่แนะนำ'}
                            </h6>
                            <ul className="list-disc list-inside mb-6 text-lg">
                                <li>{isEnglish ? 'Sugarcane growing regions' : 'พื้นที่ที่ปลูกอ้อย'}</li>
                                <li>{isEnglish ? 'Fertilizer and irrigation techniques' : 'เทคนิคการใส่ปุ๋ยและการให้น้ำ'}</li>
                                <li>{isEnglish ? 'Sugarcane harvesting and processing' : 'การเก็บเกี่ยวและการแปรรูปอ้อย'}</li>
                                <li>{isEnglish ? 'Environmental impact of sugarcane farming' : 'ผลกระทบต่อสิ่งแวดล้อมจากการปลูกอ้อย'}</li>
                                <li>{isEnglish ? 'Sugarcane disease management' : 'การจัดการโรคอ้อย'}</li>
                            </ul>

                            <h6 className="font-semibold text-xl mb-3">
                                {isEnglish ? 'Troubleshooting Tips' : 'เคล็ดลับการแก้ปัญหา'}
                            </h6>
                            <p className="text-lg mb-6">
                                {isEnglish ? (
                                    <>
                                        If I don&apos;t understand your question:
                                        <br/>
                                        - Try rephrasing your question.
                                        <br/>
                                        - Use simpler language.
                                        <br/>
                                        - Ask about a different aspect of sugarcane.
                                    </>
                                ) : (
                                    <>
                                        หากฉันไม่เข้าใจคำถามของคุณ:
                                        <br/>
                                        - ลองถามในรูปแบบอื่น
                                        <br/>
                                        - ใช้ภาษาที่ง่ายขึ้น
                                        <br/>
                                        - ถามเกี่ยวกับด้านอื่นของอ้อย
                                    </>
                                )}
                            </p>

                            <h6 className="font-semibold text-xl mb-3">
                                {isEnglish ? 'Contact for More Help' : 'ติดต่อเพื่อขอความช่วยเหลือเพิ่มเติม'}
                            </h6>
                            <p className="text-lg mb-6">
                                {isEnglish ?
                                    'If you need more detailed information or assistance, feel free to contact us at ' :
                                    'หากคุณต้องการข้อมูลเพิ่มเติมหรือความช่วยเหลือ โปรดติดต่อเราที่ '}
                                <a href="mailto:Kandit.t@kkumail.com" target="_blank" rel="noopener noreferrer"
                                   className="text-blue-500 hover:underline">
                                    {isEnglish ? 'Kandit.t@kkumail.com' : 'Kandit.t@kkumail.com'}
                                </a>.
                            </p>

                            <h6 className="font-semibold text-xl mb-3">
                                {isEnglish ? 'Examples of What You Can Learn' : 'ตัวอย่างสิ่งที่คุณสามารถเรียนรู้ได้'}
                            </h6>
                            <ul className="list-disc list-inside text-lg">
                                <li>{isEnglish ? 'The ideal soil for sugarcane growth' : 'ดินที่เหมาะสมสำหรับการปลูกอ้อย'}</li>
                                <li>{isEnglish ? 'Various byproducts of sugarcane processing' : 'ผลพลอยได้ต่างๆ จากการแปรรูปอ้อย'}</li>
                                <li>{isEnglish ? 'How sugarcane helps in ethanol production' : 'อ้อยช่วยในการผลิตเอทานอลอย่างไร'}</li>
                                <li>{isEnglish ? 'The lifecycle of sugarcane plants' : 'วงจรชีวิตของต้นอ้อย'}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {isAboutModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-hidden">
                    <div
                        ref={aboutModalRef}
                        className="modal-content p-6 rounded-lg shadow-lg w-full max-w-sm max-h-[90vh] m-4 overflow-y-scroll no-scrollbar dark:bg-[#e6dace]"
                    >
                        <div className="modal-header flex justify-between items-center mb-4 dark:bg-[#e6dace]">
                            <h5 className="modal-title  font-bold text-2xl">Members</h5>
                            <button type="button" className="close text-xl" onClick={toggleAboutModal}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body p-4 rounded-lg dark:bg-[#e6dace]">
                            <div className="grid grid-cols-1 gap-4 dark:bg-[#e6dace]">
                                {teamMembers.map((member) => (
                                    <div key={member.name}
                                         className="flex flex-col items-center mb-5 p-4 bg-gray-800 rounded-2xl dark:bg-[#f4ece7] text-xl">
                                        <Image
                                            src={member.profileImage}
                                            alt={member.name}
                                            width={200}
                                            height={100}
                                            className="rounded-full"
                                        />
                                        <h6 className="text-md font-semibold mt-2 text-center">
                                            {member.name}
                                            <br/>
                                            {member.stuID}
                                        </h6>
                                        <div className="flex text-center gap-4 mt-2 bg-gray-800 dark:bg-[#f4ece7]">
                                            <a
                                                href={member.githubUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-500 rounded-xl p-1 hover:underline flex items-center gap-2"
                                            >
                                                <FontAwesomeIcon icon={faGithub} width={30} height={30}/>
                                                {member.githubUsername}
                                            </a>
                                        </div>
                                        <div className="flex text-center gap-4 mt-2 bg-gray-800 dark:bg-[#f4ece7]">
                                            <a
                                                href={member.instagramUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-red-500 rounded-xl p-1 hover:underline flex items-center gap-2"
                                            >
                                                <FontAwesomeIcon icon={faInstagram} width={30} height={30}/>
                                                {member.instagramUsername}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='text-2xl font-bold dark:bg-[#e6dace] mb-2 '>Motivation</div>
                        <div className="modal-body p-4 rounded-lg dark:bg-[#f4ece7] text-lg">
                            <li>The sugarcane industry is a vital component of the agricultural sector.</li>
                            <li>There’re numerous challenges about sugarcane farming.</li>
                            <li>Farmers often encounter difficulties in accessing and applying the latest agricultural
                                practices.
                            </li>
                        </div>
                        <div className='text-2xl font-bold dark:bg-[#e6dace] mt-5 mb-2'>Credits</div>
                        <div className="modal-body text-xl p-4 rounded-lg dark:bg-[#f4ece7] ">
                            <ul className="space-y-2">
                                <a href='https://storyset.com/' target="_blank" rel="noreferrer">
                                    <li className="hover:bg-gray-200 dark:hover:bg-orange-400 p-2 rounded-md transition-colors duration-300 hover:text-black dark:hover:text-white">
                                        StorySET
                                    </li>
                                </a>
                                <a href='https://www.freepik.com/' target="_blank" rel="noreferrer">
                                    <li className="hover:bg-gray-200 dark:hover:bg-orange-500 p-2 rounded-md transition-colors duration-300 hover:text-black dark:hover:text-white">
                                        Freepik
                                    </li>
                                </a>
                                <a href='https://www.flaticon.com/' target="_blank" rel="noreferrer">
                                    <li className="hover:bg-gray-200 dark:hover:bg-orange-400 p-2 rounded-md transition-colors duration-300 hover:text-black dark:hover:text-white">
                                        Flaticon
                                    </li>
                                </a>
                            </ul>
                        </div>
                    </div>
                </div>

            )}


        </div>
    );
};

export default Sidebar;
