"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { handleAxiosError } from "@/utils/errorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { getAuthToken, JwtPayload, verifyToken } from "@/lib/auth";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

type UserContextType = {
  user: JwtPayload | null;
  setUser: (user: JwtPayload | null) => void;
  discordData: any;
  setFetchDiscordUser: (value: boolean) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [fetchDiscordUser, setFetchDiscordUser] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      const userData = verifyToken(token);
      setUser(userData);
    }
  }, []);

  const { data: discordData } = useQuery({
    queryKey: ["discordData"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/api/auth/discord");
        return response.data;
      } catch (error) {
        const errorDetails = handleAxiosError(error as AxiosError);
        toast({
          title: "Discord Data Fetch Failed",
          description: errorDetails.message,
          variant: "destructive",
        });

        if (errorDetails.redirect) {
          router.push(errorDetails.redirect);
        }
        return null;
      }
    },
    enabled: fetchDiscordUser,
  });

  return (
    <UserContext.Provider
      value={{ user, setUser, discordData, setFetchDiscordUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
