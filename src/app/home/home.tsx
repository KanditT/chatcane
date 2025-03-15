"use client";
import React from "react";
import { useUser } from "../userState";
import MainPage from "./mainpage";
import Chat from '../chatSection/chat'

export default function Home() {
    const { user } = useUser();
    return (
        <>
            {user ?  <Chat/> : <MainPage/> }
        </>
    );
}
