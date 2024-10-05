import type { Metadata } from "next";
import localFont from "next/font/local";
'use client';
import "./globals.css";
import Sidebar from "./sidebar/sidebar";
import Navbar from "./navbar/navbar";
import { ThemeProvider } from './themeContext';

import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider>
      <html lang="en">
        <head>
          <title>ChatCane</title>
        </head>
        <body className="bg-gray-100 h-screen overflow-hidden">
          <div className="flex h-full">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content with Navbar */}
            <div className="flex-1 ml-[calc(16rem+1.5rem)] p-6 h-full flex flex-col">
              <Navbar />
              <div className="mt-6 flex-1 ">
                {children}
              </div>
            </div>
          </div>
        </body>
      </html>
    </ThemeProvider>
  );
}
