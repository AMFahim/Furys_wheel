"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@/providers/UserContext";
import { setAuthToken } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import { handleAxiosError } from "@/utils/errorHandler";
import { AxiosError } from "axios";

export default function DiscordCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    const token = searchParams.get("token");
    const userDataStr = searchParams.get("userData");

    if (token && userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        setAuthToken(token);
        setUser(userData);
        toast({
          title: "Login successful",
          description: "Welcome back!",
          variant: "default",
        });
        router.push("/dashboard");
      } catch (error) {
        const errorDetails = handleAxiosError(error as AxiosError);
        toast({
          title: "Authentication failed",
          description: errorDetails.message,
          variant: "destructive",
        });

        if (errorDetails.redirect) {
          router.push(errorDetails.redirect);
        } else {
          router.push("/login");
        }
      }
    } else {
      router.push("/login");
    }
  }, [searchParams, router, setUser, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-purple-500">Processing login...</div>
    </div>
  );
}
