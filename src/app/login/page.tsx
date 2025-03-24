"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import gglogo from "/images/google-icon-logo-svgrepo-com.png";
import { loginUser } from "../login.js";
import { useRouter } from "next/navigation";
import { useUser } from "../userState";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserHandle } = useUser();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please enter your e-mail and password");
      return;
    }

    try {
      const user = await loginUser(email, password);
      if (user.email) {
        setUserHandle(user.email);
        window.location.href = "/";
      }
    } catch (error) {
      alert("Incorrect email or password. Please try again.");
    }
  };

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-In Success:", result);
      window.location.href = "/";
    } catch (error) {
      alert("Google Sign-In failed. Try again.");
    }
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-muted px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>

            <CardTitle className="flex text-2xl w-full justify-center">
              <img
                  src="https://scontent.fkkc4-2.fna.fbcdn.net/v/t1.15752-9/485169210_646095441540595_4536175206696792204_n.png?_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_ohc=DKTs2RquwQwQ7kNvgErUP79&_nc_oc=AdlYuUpl8PcqQlULdLA6ZA40xwKmZqFMk-DI_skPPgSfz-SEDmgcwWWba-_Mz5N5RTyibsFLCCNvxEBB2NkP-Z0v&_nc_zt=23&_nc_ht=scontent.fkkc4-2.fna&oh=03_Q7cD1wEEOqV49pxDZexZ89dtuM6RuIomtVLJ2lkezNkpz1LpxQ&oe=6807A75C"
                  alt="ChatCane Logo"
                  className="w-12 py-2"
              />
            </CardTitle>
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to continue using ChatCane
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
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
                  className="absolute right-3 top-9 text-muted-foreground"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a href="#" className="text-sm text-muted-foreground hover:underline">
                Forgot password?
              </a>
            </div>

            <Button className="w-full" onClick={handleSignIn}>
              Login
            </Button>

            <Button variant="outline" className="w-full" onClick={handleGoogle}>
              <Image src={gglogo} alt="Google" width={20} height={20} className="mr-2" />
              Sign in with Google
            </Button>
          </CardContent>

          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button onClick={handleSignUp} className="underline ml-1">
                Sign Up
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
  );
};

export default Login;
