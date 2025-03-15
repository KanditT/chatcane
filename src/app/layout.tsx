'use client';

import "./globals.css";
import React, { useState } from 'react';
// import Sidebar from "./sidebar/sideMINI";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import Navbar from "./navbar/navbar";
import { ThemeProvider } from './themeContext';

import { ReactNode } from 'react';
import { UserContextProvider } from "./userState";
import {AppSidebar} from "@/app/sidebar_v1/app-sidebar";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { useUser } from "@/app/userState";
// import { Login } from "@/app/login";


interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

    const { user } = useUser();

    return (
        <ThemeProvider>
            <html lang="en">
            <head>
                <title>ChatCane</title>
            </head>
            <body className="h-screen overflow-hidden w-full">
            <UserContextProvider>
                <div className="flex h-screen ">
                    {/* Sidebar for medium to large screens */}
                    <SidebarProvider>
                        <AppSidebar/>
                        <main className="flex-1 h-screen">
                            {user && (
                                <div className="flex flex-row items-center justify-between w-full pr-3">
                                    <SidebarTrigger/>
                                    <img
                                        src="https://scontent.fkkc4-2.fna.fbcdn.net/v/t1.15752-9/484277065_1352979129178010_3750569693927337592_n.png?_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_ohc=diKcDqcR7NYQ7kNvgHT_ROG&_nc_oc=Adi_8sgZ0lYiv7klU1GzLB6gWpYCyC6qLO_YOS2YoDkmthj3dQj_r3tBZsUeHdN9T7gUN3Cut8efNzKahM_vMwRR&_nc_zt=23&_nc_ht=scontent.fkkc4-2.fna&oh=03_Q7cD1wHFrdbZ9iytbaGHkW-lhwYKRSov9S2Npykj0LSsnVWK5Q&oe=67FD50AF"
                                        alt="ChatCane Logo"
                                        className="w-30 h-16 pt-5"
                                    />
                                    <Avatar className="h-8 w-8 rounded-full">
                                        <AvatarImage src='/avatars/shadcn.jpg' alt='logo'/>
                                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                    </Avatar>
                                </div>

                            )}

                            <div className="flex flex-col h-screen p-2">
                                {children}
                            </div>


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
