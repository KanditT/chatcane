"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TypewriterLoop from "@/app/home/TypewriterLoop";

const MainPage = () => {
    const router = useRouter();

    const handleLogin = () => {
        router.push("/login");
    };

    const handleSignup = () => {
        router.push("/signup");
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* สี่เหลี่ยมตกแต่งพื้นหลัง (ตัวอย่าง) */}
            <div className="absolute z-[-10] top-[-4rem] left-[-10rem] w-24 h-24 sm:w-16 sm:h-16 md:w-32 md:h-32 bg-blue-200 rounded-md rotate-[30deg]" />
            <div className="absolute z-[-10] top-[10%] left-[5%] w-32 h-32 sm:w-20 sm:h-20 md:w-40 md:h-40 bg-pink-200 rounded-lg rotate-[45deg]" />
            <div className="absolute z-[-10] top-[5%] right-[5%] w-24 h-24 sm:w-12 sm:h-12 md:w-24 md:h-24 bg-green-200 rounded-md rotate-[200deg]" />
            <div className="absolute z-[-10] bottom-[15%] left-[15%] w-36 h-36 sm:w-24 sm:h-24 md:w-48 md:h-48 bg-yellow-200 rounded-md rotate-[300deg]" />
            <div className="absolute z-[-10] bottom-[80%] right-[50%] w-40 h-40 sm:w-24 sm:h-24 md:w-42 md:h-42 bg-red-200 rounded-lg rotate-[20deg]" />
            <div className="absolute z-[-10] top-[30%] left-[75%] w-28 h-28 sm:w-20 sm:h-20 md:w-36 md:h-36 bg-purple-200 rounded-xl rotate-[25deg]" />
            <div className="absolute z-[-10] bottom-[30%] left-[70%] w-28 h-28 sm:w-20 sm:h-20 md:w-36 md:h-36 bg-indigo-200 rounded-md rotate-[35deg]" />
            <div className="absolute z-[-10] bottom-[5%] right-[5%] w-20 h-64 sm:w-16 sm:h-16 md:w-28 md:h-28 bg-lime-200 rounded-lg rotate-[40deg]" />

            {/* คอนเทนต์หลัก */}
            <div className="z-10 text-center px-4">
                {/* รูปภาพอยู่ตรงกลาง */}
                <div className="flex justify-center mb-6">
                    <img
                        src="https://scontent.fnak4-2.fna.fbcdn.net/v/t1.15752-9/482762607_625839653544812_2685628940006816906_n.png?_nc_cat=111&ccb=1-7&_nc_sid=0024fc&_nc_ohc=5EDyzLtu3PMQ7kNvgHjyjTm&_nc_oc=Adh5BPlI4kPPIyKxCEeSGzXb5BWnSaTORw-zYzR5zXHtj-faOs0vzT1csx0cGi3aVa4&_nc_ad=z-m&_nc_cid=1277&_nc_zt=23&_nc_ht=scontent.fnak4-2.fna&oh=03_Q7cD1wEtkQpQMNVk5CnJJLcPheNtbCbDpydECS1ZtUiRSjTaZw&oe=67FCE7CC"
                        alt="ChatCane Logo"
                        className="w-32 h-40"
                    />
                </div>
                <h1 className="text-5xl font-extrabold mb-6">ChatCoE</h1>
                <TypewriterLoop />
                <div className="flex flex-col gap-4 justify-center mt-8 flex-wrap items-center w-full">
                    <Button onClick={handleLogin} className="px-20 py-6 text-lg rounded-2xl hover:bg-gray-200 hover:text-black  ">
                        Login
                    </Button>
                    <Button onClick={handleSignup} variant="secondary" className="px-[70px] py-6 text-lg rounded-2xl hover:bg-gray-700 hover:text-white" >
                        Sign Up
                    </Button>
                </div>

            </div>

            <style jsx>{`
                .blinking-cursor {
                    font-weight: 100;
                    font-size: 1rem;
                    color: #333;
                    animation: blink 0.7s infinite;
                }
                @keyframes blink {
                    0% {
                        opacity: 1;
                    }
                    49% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0;
                    }
                    99% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};

export default MainPage;
