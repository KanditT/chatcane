'use client';
import React, { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons
import cclogo from "/images/cclogo.png";
import gglogo from "/images/google-icon-logo-svgrepo-com.png";

const SignUp = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleSignUp = () => {
        // Check if the passwords match
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
        } else {
            setPasswordError("");
            // Proceed with sign-up logic
            console.log("Passwords match. Proceed with sign-up...");
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Side: Sign-Up Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-24 bg-background dark:bg-navBG text-foreground dark:text-foreground">
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-h2Color">Sign Up</h1>
                    <p className="text-aTextColor mb-6">Create an account to get started</p>

                    {/* Google Sign-Up Button */}
                    <button className="w-full py-2 mb-4 bg-white dark:bg-asideBG text-gray-800 dark:text-foreground font-semibold rounded-lg flex items-center justify-center shadow-md hover:bg-aBGHover hover:text-aHoverTextColor">
                        <Image src={gglogo} alt="Google Icon" className="h-6 w-6 mr-2" />
                        Sign up with Google
                    </button>

                    <div className="flex items-center mb-4">
                        <hr className="flex-grow border-gray-600" />
                        <span className="mx-2 text-aTextColor text-sm">Or sign up via our secure system</span>
                        <hr className="flex-grow border-gray-600" />
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-semibold mb-1 text-h2Color">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="mail@user.com"
                            className="w-full px-4 py-2 bg-asideBG text-neutral-950 dark:bg-navBG rounded-lg border border-gray-700 focus:bg-blue-50 focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-sm font-semibold mb-1 text-h2Color">Password</label>
                        <input
                            type={passwordVisible ? "text" : "password"} // Toggle between text and password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 bg-asideBG text-neutral-950 dark:bg-navBG text-foreground rounded-lg border border-gray-700 focus:bg-blue-50 focus:border-blue-500 focus:outline-none"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-600 dark:text-gray-300"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />} {/* Show Eye or EyeSlash */}
                        </button>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-4 relative">
                        <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-1 text-h2Color">Confirm Password</label>
                        <input
                            type={confirmPasswordVisible ? "text" : "password"} // Toggle between text and password
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 bg-asideBG text-neutral-950 dark:bg-navBG text-foreground rounded-lg border border-gray-700 focus:bg-blue-50 focus:border-blue-500 focus:outline-none"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-600 dark:text-gray-300"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />} {/* Show Eye or EyeSlash */}
                        </button>
                    </div>

                    {/* Error Message */}
                    {passwordError && <p className="text-red-500 mb-4">{passwordError}</p>}

                    {/* Terms of Service */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <input type="checkbox" id="terms" className="mr-2" />
                            <label htmlFor="terms" className="text-aTextColor text-sm">I agree to the <a href="#" className="text-aHoverTextColor hover:underline">Terms of Service</a></label>
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <button
                        className="w-full py-3 bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-lg transition duration-300"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </button>
                </div>
            </div>

            {/* Right Side: Background Image */}
            <div className="hidden lg:block w-1/2">
                <div className="relative h-full">
                    <Image
                        src={cclogo}
                        alt="Background"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
