"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@/providers/UserContext";
import { setAuthToken } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

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
        
        // Set the token in localStorage or cookie
        setAuthToken(token);
        
        // Update the user context
        setUser(userData);

        toast({
          title: "Login successful",
          description: "Welcome to your account!",
          variant: "default",
        });

        // Redirect to profile page
        router.push("/profile");
      } catch (error) {
        console.error("Error processing login:", error);
        toast({
          title: "Login failed",
          description: "There was an error logging you in. Please try again.",
          variant: "destructive",
        });
        router.push("/login");
      }
    } else {
      toast({
        title: "Login failed",
        description: "Missing authentication data. Please try again.",
        variant: "destructive",
      });
      router.push("/login");
    }
  }, [searchParams, router, setUser, toast]);

  return (
    <Suspense fallback={"Loading..."}>
      <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-purple-500">Processing login...</div>
    </div>
    </Suspense>
  );
}
