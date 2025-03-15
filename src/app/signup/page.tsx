"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import cclogo from "/images/blue.png";
import gglogo from "/images/google-icon-logo-svgrepo-com.png";
import { registerUser } from "../register.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

// Import shadcn UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [agreed, setAgreed] = useState(false); // state สำหรับ checkbox

    const handleGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            console.log("Google Sign-Up Success:", result);
            window.location.href = "/login";
        } catch (error) {
            console.error("Google Sign-Up Error:", error);
            alert("Error during Google sign-in. Please try again.");
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible((prev) => !prev);
    };

    const handleSignUp = async () => {
        if (!email || !password || !confirmPassword) {
            alert("Please enter your e-mail, password, and confirm password");
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
        } else {
            setPasswordError("");
            try {
                const user = await registerUser(email, password);
                console.log("User registered:", user);
                alert("Registration successful!");
                window.location.href = "/login";
            } catch (error) {
                if (error instanceof Error) {
                    alert(`Error during registration: ${error.message}`);
                } else {
                    alert("An unknown error occurred during registration.");
                }
                console.error("Registration error: ", error);
            }
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Side: Sign-Up Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-24 dark:bg-navBG text-foreground dark:text-foreground">
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Create an account to get started
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="mail@user.com"
                                    className="mt-1"
                                />
                            </div>
                            <div className="relative">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type={passwordVisible ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="mt-1 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-2 top-10 text-gray-600"
                                >
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <div className="relative">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    type={confirmPasswordVisible ? "text" : "password"}
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="mt-1 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute right-2 top-10 text-gray-600"
                                >
                                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {passwordError && (
                                <p className="text-red-500 text-sm">{passwordError}</p>
                            )}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="mr-2"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                />
                                <Label htmlFor="terms" className="text-sm">
                                    I agree to the{" "}
                                    <a href="#" className="text-blue-600 hover:underline">
                                        Terms of Service
                                    </a>
                                </Label>
                            </div>
                            <Button onClick={handleSignUp} className="w-full" disabled={!agreed}>
                                Sign Up
                            </Button>
                            <div className="flex items-center">
                                <hr className="flex-grow border-gray-600" />
                                <span className="mx-2 text-sm text-muted-foreground">
                  Or sign up via our secure system
                </span>
                                <hr className="flex-grow border-gray-600" />
                            </div>
                            <Button variant="outline" onClick={handleGoogle} className="w-full">
                                <Image src={gglogo} alt="Google Icon" className="h-6 w-6 mr-2" />
                                Sign up with Google
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            {/* Right Side: Background Image */}
            <div className="hidden lg:block w-1/2">
                <div className="relative h-full w-full">
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
