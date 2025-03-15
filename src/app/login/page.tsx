'use client';

import React, { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import cclogo from "/images/green.png";
import gglogo from "/images/google-icon-logo-svgrepo-com.png";
import { loginUser } from "../login.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useUser } from "../userState";

// นำเข้า component จาก shadcn UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from 'next/navigation';
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setUserHandle } = useUser();
  const router = useRouter();
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-Up Success:", result);
      window.location.href = "/";
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
        setUserHandle(user.email);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        alert("Incorrect email or password. Please try again.");
      } else {
        alert("An unknown error occurred during login.");
      }
    }
  };

  const handleSignUp = () => {
    router.push("/signup");

  }

  return (
      <div className="flex min-h-screen">
        {/* Form ด้านซ้าย */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-24">
          <h1 className="text-3xl font-bold mb-2">Login</h1>
          <p className="mb-6">Please login to continue</p>

          {/* ฟิลด์สำหรับ Email */}
          <div className="mb-4">
            <Label htmlFor="email" className="block mb-1">
              Email
            </Label>
            <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mail@user.com"
            />
          </div>

          {/* ฟิลด์สำหรับ Password พร้อมปุ่ม Toggle */}
          <div className="mb-4 relative">
            <Label htmlFor="password" className="block mb-1">
              Password
            </Label>
            <Input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
            />
            <button
                type="button"
                className="absolute right-3 top-9"
                onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* แสดงข้อความ error หากมี */}
          {passwordError && (
              <p className="text-red-500 mb-4">{passwordError}</p>
          )}

          {/* Remember Me กับ Forgot password */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Checkbox id="remember" className="mr-2" />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>
            <a href="#" className="text-sm hover:underline">
              Forgot password?
            </a>
          </div>

          {/* ปุ่ม Login */}
          <Button className="w-full py-3 mb-6" onClick={handleSignIn}>
            Login
          </Button>


          <Button
              variant="secondary"
              className="w-full py-3 mb-6 shadow-lg"
              onClick={handleSignUp}
          >
            Sign Up
          </Button>



          <div className="flex items-center mb-4">
            <hr className="flex-grow border-gray-600" />
            <span className="mx-2 text-sm">
            Or login via our secure system
          </span>
            <hr className="flex-grow border-gray-600" />
          </div>
          {/* ปุ่ม Sign in ด้วย Google */}
          <Button
              variant="outline"
              className="w-full py-2 mb-4"
              onClick={handleGoogle}
          >
            <Image
                src={gglogo}
                alt="Google Icon"
                className="h-6 w-6 mr-2"
            />
            Sign in with Google
          </Button>

        </div>

        {/* ด้านขวา: รูปภาพพื้นหลัง */}
        <div className="hidden lg:block w-1/2">
          <div className="relative h-[calc(90%)] w-[calc(90%)]">
            <Image
                src={cclogo}
                alt="Background"
                fill
                className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
  );
};

export default Login;
