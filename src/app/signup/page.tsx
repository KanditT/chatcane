"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import gglogo from "/images/google-icon-logo-svgrepo-com.png";
import { registerUser } from "../register.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

// ShadCN UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [agreed, setAgreed] = useState(false);

    const togglePasswordVisibility = () =>
        setPasswordVisible((prev) => !prev);
    const toggleConfirmPasswordVisibility = () =>
        setConfirmPasswordVisible((prev) => !prev);

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

    const handleSignUp = async () => {
        if (!email || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        setPasswordError("");

        try {
            const user = await registerUser(email, password);
            console.log("User registered:", user);
            alert("Registration successful!");
            window.location.href = "/login";
        } catch (error) {
            alert("Error during registration.");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted px-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Create an account to continue
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type={passwordVisible ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute top-9 right-3 text-muted-foreground"
                        >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <div className="relative">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type={confirmPasswordVisible ? "text" : "password"}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute top-9 right-3 text-muted-foreground"
                        >
                            {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {passwordError && (
                        <p className="text-red-500 text-sm">{passwordError}</p>
                    )}

                    <div className="flex items-center space-x-2">
                        <input
                            id="terms"
                            type="checkbox"
                            className="w-4 h-4"
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

                    <Button onClick={handleSignUp} disabled={!agreed} className="w-full">
                        Sign Up
                    </Button>

                    <div className="flex items-center">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-2 text-sm text-muted-foreground">or</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <Button variant="outline" onClick={handleGoogle} className="w-full">
                        <Image
                            src={gglogo}
                            alt="Google"
                            width={20}
                            height={20}
                            className="mr-2"
                        />
                        Sign up with Google
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignUp;
