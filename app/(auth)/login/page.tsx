"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Loader2, LogIn } from "lucide-react";
import { DiscordLoginButton } from "@/components/discord-login-button";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/utils/axiosInstance";
import { useUser } from "@/providers/UserContext";
import { handleAxiosError } from "@/utils/errorHandler";
import { setAuthToken } from "@/lib/auth";
import { AxiosError } from "axios";

interface LoginError {
  username?: string;
  password?: string;
  general?: string;
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginError>({});

  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const response = await axiosInstance.post("/api/auth/login", {
        username,
        password,
      });

      if (response.data.token && response.data.user) {
        setAuthToken(response.data.token);
        setUser(response.data.user);
        toast({
          title: "Login successful",
          description: "Welcome back!",
          variant: "default",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      const errorDetails = handleAxiosError(error as AxiosError);

      toast({
        title: "Login failed",
        description: errorDetails.message,
        variant: "destructive",
      });

      if (errorDetails.errors) {
        setErrors(errorDetails.errors);
      }

      if (errorDetails.redirect) {
        router.push(errorDetails.redirect);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a1a2e] to-[#121225] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-purple-500/30 bg-[#1e1e36]/80 backdrop-blur-sm text-white shadow-[0_0_25px_rgba(123,104,238,0.2)]">
          <CardHeader className="space-y-1">
            <div className="flex justify-between items-center">
              <motion.div
                whileHover={{ x: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  variant="ghost"
                  asChild
                  className="text-gray-300 hover:text-white hover:bg-purple-900/20 p-0"
                >
                  <Link href="/" className="flex items-center gap-1">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </Link>
                </Button>
              </motion.div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-purple-600">
              Login to Fury&apos;s Wheel
            </CardTitle>
            <CardDescription className="text-gray-400 text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="text-red-400 text-sm text-center">
                  {errors.general}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">
                  Username
                </Label>
                <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`bg-[#252547] border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/20 text-white placeholder:text-gray-500 ${
                      errors.username ? "border-red-500" : ""
                    }`}
                  />
                  {errors.username && (
                    <span className="text-red-400 text-sm mt-1">
                      {errors.username}
                    </span>
                  )}
                </motion.div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`bg-[#252547] border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/20 text-white placeholder:text-gray-500 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  {errors.password && (
                    <span className="text-red-400 text-sm mt-1">
                      {errors.password}
                    </span>
                  )}
                </motion.div>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-5 rounded-lg shadow-[0_0_15px_rgba(123,104,238,0.3)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(123,104,238,0.5)]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative z-10 bg-[#1e1e36] px-3 text-sm text-gray-400">
                or continue with
              </div>
            </div>

            <DiscordLoginButton />
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
