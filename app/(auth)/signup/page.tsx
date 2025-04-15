"use client";

import React, { useState } from "react";
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
} from "@/components/ui/card"
import { ArrowLeft, Loader2, UserPlus } from "lucide-react"
import { DiscordLoginButton } from "@/components/discord-login-button"
import axiosInstance from "@/utils/axiosInstance"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

type UserData = {
  username: string;
  password: string;
}

export default function RegisterPage() {
  const queryClient = useQueryClient();
  const navigate = useRouter()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    setFormErrors((prev) => ({ ...prev, [id]: "" }))
  }

  const postRegistrationData = async(userData:UserData) => {
    const response = await axiosInstance.post(
      "/api/auth/register",
      userData
    )
    console.log("regiser response", response);
    return response.data;

  }

  const postRegistrationDataMutation = useMutation({
    mutationFn: postRegistrationData,
    onSuccess: () => {
      toast.success("Registration Successfully Done!")
      navigate.push("/login")
      queryClient.invalidateQueries({
        queryKey: ["userData"]
      });
    },
    onError: (error) => {
      toast.error("Something Went Wrong!")
      console.error(error);
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errors = {
      username: "",
      password: "",
      confirmPassword: "",
      general: "",
    };

    if (!formData.username) {
      errors.username = "Username is required";
    }

    if(formData.username.length < 6){
      errors.username="Username must be at least 6 characters"
    }

    if(formData.username.length > 18){
      errors.username="Username must be in 18 characters"
    }

    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }
    

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    const hasErrors = Object.values(errors).some((err) => err !== "")
    if (hasErrors) {
      setFormErrors(errors)
      return
    }

    setIsLoading(true)

    try {
      await postRegistrationDataMutation.mutate(formData);
    } catch (error) {
      toast.error("Something Went Wrong!")
      console.log(error);
    }finally{
      setIsLoading(false)
    }

    // Simulate registration process
    // setTimeout(() => {
    //   setIsLoading(false)
    //   console.log("Form submitted", formData)
    // }, 1500)
  }

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
              Join Fury&apos;s Wheel
            </CardTitle>
            <CardDescription className="text-gray-400 text-center">
              Create an account to start spinning and winning
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {formErrors.general && (
              <p className="text-sm text-red-400 text-center">
                {formErrors.general}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="bg-[#252547] border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/20 text-white placeholder:text-gray-500"
                />
                {formErrors.username && (
                  <p className="text-sm text-red-400">{formErrors.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-[#252547] border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/20 text-white placeholder:text-gray-500"
                />
                {formErrors.password && (
                  <p className="text-sm text-red-400">{formErrors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="bg-[#252547] border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/20 text-white placeholder:text-gray-500"
                />
                {formErrors.confirmPassword && (
                  <p className="text-sm text-red-400">{formErrors.confirmPassword}</p>
                )}
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
                      Creating account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Register
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#1e1e36] px-2 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <DiscordLoginButton />
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <p className="text-sm text-gray-400 text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-purple-400 hover:text-purple-300 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
