'use client';
import React, { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons
import cclogo from "/images/green.png";
import gglogo from "/images/google-icon-logo-svgrepo-com.png";
import { loginUser } from "../login.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useUser } from "../userState";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setUserHandle } = useUser();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleGoogle = async () => {
    try {
      const provider = await new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // Google sign-in successful
      console.log("Google Sign-Up Success:", result);

      // Redirect to localhost after successful sign-in
      window.location.href = "/"; // เปลี่ยนเป็น URL ที่ต้องการ
    } catch (error) {
      console.error("Google Sign-Up Error:", error);
      alert("Error during Google sign-in. Please try again.");
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please enter your e-mail and password");
      return;
    }

    setPasswordError("");
    try {
      const user = await loginUser(email, password);
      console.log("User login:", user.email);
      if (user.email) {
        console.log("User email:  if (user.email) ", user.email);
        setUserHandle(user.email);
        window.location.href = "/";
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`Incorrect email or password. Please try again.`);
      } else {
        alert("An unknown error occurred during login.");
      }
      console.error("Login error: ", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-24 bg-background dark:bg-navBG text-foreground dark:text-foreground">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-h2Color">Login</h1>
          <p className="text-aTextColor mb-6">please login to continue</p>

          {/* Google Sign-in Button */}
          <button className="w-full py-2 mb-4 bg-white dark:bg-asideBG text-gray-800 dark:text-foreground font-semibold rounded-lg flex items-center justify-center shadow-md hover:bg-aBGHover hover:text-aHoverTextColor"
            onClick={handleGoogle} >
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@user.com"
              className="w-full px-4 py-2 bg-asideBG text-neutral-950 dark:bg-navBG rounded-lg border border-gray-700 focus:bg-blue-50 focus:border-blue-500 focus:outline-none"
            />
          </div>

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

          {/* Error Message */}
          {passwordError && <p className="text-red-500 mb-4">{passwordError}</p>}

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-aTextColor text-sm">Remember me</label>
            </div>
            <a href="#" className="text-sm text-aHoverTextColor hover:underline">Forgot password?</a>
          </div>

          {/* Login Button */}
          <button className="w-full py-3 bg-green-600 hover:bg-green-800 text-white font-semibold rounded-lg transition duration-300"
            onClick={handleSignIn}
          >
            Login
          </button>
        </div>
      </div>

      {/* Right Side: Background Image */}
      <div className="hidden lg:block w-1/2">
        <div className="relative h-[calc(90%)] w-[calc(90%)]">
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
