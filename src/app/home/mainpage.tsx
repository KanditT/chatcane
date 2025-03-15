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
        <div className="relative min-h-screen flex items-center justify-center  overflow-hidden">
            {/* สี่เหลี่ยม 1 (มุมบนซ้าย) */}
            <div className="absolute z-[-10] top-[-4rem] left-[-10rem] w-24 h-24 sm:w-16 sm:h-16 md:w-32 md:h-32 bg-blue-200 rounded-md rotate-[30deg]" />
            {/* สี่เหลี่ยม 2 */}
            <div className="absolute z-[-10] top-[10%] left-[5%] w-32 h-32 sm:w-20 sm:h-20 md:w-40 md:h-40 bg-pink-200 rounded-lg rotate-[45deg]" />
            {/* สี่เหลี่ยม 3 (มุมบนขวา) */}
            <div className="absolute z-[-10] top-[10%] right-[25%] w-24 h-24 sm:w-12 sm:h-12 md:w-24 md:h-24 bg-green-200 rounded-md rotate-[275deg]" />
            {/* สี่เหลี่ยม 4 */}
            <div className="absolute z-[-10] bottom-[10%] left-[10%] w-36 h-36 sm:w-24 sm:h-24 md:w-48 md:h-48 bg-yellow-200 rounded-md rotate-[10deg]" />
            {/* สี่เหลี่ยม 5 */}
            <div className="absolute z-[-10] bottom-[75%] right-[50%] w-40 h-40 sm:w-24 sm:h-24 md:w-48 md:h-48 bg-red-200 rounded-lg rotate-[20deg]" />
            {/* สี่เหลี่ยม 6 */}
            <div className="absolute z-[-10] top-[30%] left-[80%] w-28 h-28 sm:w-20 sm:h-20 md:w-36 md:h-36 bg-purple-200 rounded-xl rotate-[25deg]" />
            {/* สี่เหลี่ยม 7 */}
            <div className="absolute z-[-10] bottom-[30%] left-[60%] w-28 h-28 sm:w-20 sm:h-20 md:w-36 md:h-36 bg-indigo-200 rounded-md rotate-[35deg]" />
            {/* สี่เหลี่ยม 8 (มุมล่างขวา) */}
            <div className="absolute z-[-10] bottom-[5%] right-[5%] w-20 h-64 sm:w-16 sm:h-16 md:w-28 md:h-28 bg-lime-200 rounded-lg rotate-[40deg]" />

            {/* คอนเทนต์หลัก */}
            <div className="z-10 text-center px-4">
                <h1 className="text-4xl font-bold mb-6">ChatCane</h1>
                <TypewriterLoop />
                <div className="flex gap-4 justify-center mt-8 flex-wrap">
                    <Button onClick={handleLogin}>Login</Button>
                    <Button onClick={handleSignup} variant="secondary">
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
