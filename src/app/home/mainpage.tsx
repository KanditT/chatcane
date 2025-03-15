import {useRouter} from "next/navigation";
import TypewriterLoop from "@/app/home/TypewriterLoop";
import {Button} from "@/components/ui/button";
import React from "react";

const MainPage = () => {
    const router = useRouter();

    const handleLogin = () => {
        router.push("/login");
    };

    const handleSignup = () => {
        router.push("/signup");
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-6">ChatCane</h1>
                {/* เรียกใช้ TypewriterLoop */}
                <TypewriterLoop/>
                <div className="flex gap-4 justify-center mt-8">
                    {/*<button*/}
                    {/*    onClick={handleLogin}*/}
                    {/*    className="px-6 py-2  text-white rounded-md hover:bg-blue-700 transition"*/}
                    {/*>*/}
                    {/*    Login*/}
                    {/*</button>*/}
                    <Button onClick={handleLogin}>Login</Button>
                    <Button onClick={handleSignup} variant="secondary">Sign Up</Button>
                    {/*<button*/}
                    {/*    onClick={handleSignup}*/}
                    {/*    className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"*/}
                    {/*>*/}
                    {/*    Sign Up*/}
                    {/*</button>*/}
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
    )
}
export default MainPage;