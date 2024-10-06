'use client';
import React, { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons
import cclogo from "/images/cclogo.png";
import gglogo from "/images/google-icon-logo-svgrepo-com.png";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-24 bg-background dark:bg-navBG text-foreground dark:text-foreground">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-h2Color">Login</h1>
          <p className="text-aTextColor mb-6">please login to continue</p>

          {/* Google Sign-in Button */}
          <button className="w-full py-2 mb-4 bg-white dark:bg-asideBG text-gray-800 dark:text-foreground font-semibold rounded-lg flex items-center justify-center shadow-md hover:bg-aBGHover hover:text-aHoverTextColor">
            <Image src={gglogo} alt="Google Icon" className="h-6 w-6 mr-2" />
            Sign in with Google
          </button>

          <div className="flex items-center mb-4">
            <hr className="flex-grow border-gray-600" />
            <span className="mx-2 text-aTextColor text-sm">Or login via our secure system</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          {/* Email and Password Fields */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-1 text-h2Color">Email</label>
            <input
              type="email"
              id="email"
              placeholder="mail@user.com"
              className="w-full px-4 py-2 bg-asideBG text-neutral-950 dark:bg-navBG rounded-lg border border-gray-700 focus:bg-blue-50 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-semibold mb-1 text-h2Color">Password</label>
            <input
              type={passwordVisible ? "text" : "password"} // Toggle between text and password
              id="password"
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

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-aTextColor text-sm">Remember me</label>
            </div>
            <a href="#" className="text-sm text-aHoverTextColor hover:underline">Forgot password?</a>
          </div>

          {/* Login Button */}
          <button className="w-full py-3 bg-green-600 hover:bg-green-800 text-white font-semibold rounded-lg transition duration-300">
            Login
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

export default Login;
