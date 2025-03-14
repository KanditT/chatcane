'use client';

import "./globals.css";
import React, { useState } from 'react';
// import Sidebar from "./sidebar/sideMINI";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

// import Navbar from "./navbar/navbar";
import { ThemeProvider } from './themeContext';
import { FaBars } from 'react-icons/fa';
import { ReactNode } from 'react';
import { UserContextProvider } from "./userState";
import {AppSidebar} from "@/app/sidebar_v1/app-sidebar";
// import { Login } from "@/app/login";


interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleSidebarCollapse = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const handleSidebarOpen = () => {
        toggleSidebar();
        if (isSidebarCollapsed) {
            toggleSidebarCollapse();
        }
    };


    return (
        <ThemeProvider>
            <html lang="en">
            <head>
                <title>ChatCane</title>
            </head>
            <body className="bg-gray-100 h-screen overflow-hidden w-full">
            <UserContextProvider>
                <div className="flex h-full">
                    {/* Hamburger Icon for smaller screens */}
                    <div className="sm:hidden p-4 fixed z-30">
                        <FaBars
                            className="text-2xl cursor-pointer"
                            onClick={handleSidebarOpen}
                        />
                    </div>
                    {/* Sidebar for medium to large screens */}
                    <SidebarProvider>
                        <AppSidebar/>
                        <main className="flex-1 h-full">
                            <SidebarTrigger />
                            {children}
                        </main>
                    </SidebarProvider>

                    {/* Main Content with Navbar */}
                    {/*<div className={flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'sm:ml-16' : 'sm:ml-64'} p-6}>*/}
                    {/*  <Navbar isSidebarCollapsed={isSidebarCollapsed} />*/}
                    {/*  <div className=" mt-6 flex-1">*/}

                    {/*    {children}*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                </div>
            </UserContextProvider>
            </body>
            </html>
        </ThemeProvider>
    );
}
