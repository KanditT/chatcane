'use client';

import "./globals.css";
import React, { useState } from 'react';
import Sidebar from "./sidebar/sideMINI";
import Navbar from "./navbar/navbar";
import { ThemeProvider } from './themeContext';
import { FaBars } from 'react-icons/fa';
import { ReactNode } from 'react';

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

  return (
    <ThemeProvider>
      <html lang="en">
        <head>
          <title>ChatCane</title>
        </head>
        <body className="bg-gray-100 h-screen overflow-hidden">
          <div className="flex h-full">
            {/* Hamburger Icon for smaller screens */}
            <div className="sm:hidden p-4 fixed z-20">
              <FaBars
                className="text-2xl cursor-pointer"
                onClick={toggleSidebar}
              />
            </div>
            {/* Sidebar for medium to large screens */}
            <div className={`fixed z-50 top-0 left-0 h-full transition-width duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64'} ${isSidebarOpen ? 'block' : 'hidden'} sm:block`}>
              <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                isSidebarCollapsed={isSidebarCollapsed}
                toggleSidebarCollapse={toggleSidebarCollapse}
              />
            </div>

            {/* Main Content with Navbar */}
            <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'sm:ml-16' : 'sm:ml-64'} p-6`}>
              <Navbar />
              <div className="mt-6 flex-1">
                {children}
              </div>
            </div>
          </div>
        </body>
      </html>
    </ThemeProvider>
  );
}
