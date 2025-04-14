"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/UserContext";
import { removeAuthToken } from "@/lib/auth";
import { LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/utils/axiosInstance";

export function LogoutButton() {
  const router = useRouter();
  const { setUser } = useUser();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      removeAuthToken();
      setUser(null);
      toast({
        title: "Logged out successfully",
        description: "See you soon!",
        variant: "default",
      });
      router.push("/login");
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      className="w-full justify-start"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
}