"use client";

import axiosInstance from "@/utils/axiosInstance";
import { createContext, useContext, useState, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

type User = {
  name: string;
  email: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
  discordData: any;
  setFetchDiscordUser: (value: boolean) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [fetchDiscordUser, setFetchDiscordUser] = useState(false);

  const { data: discordData } = useQuery({
    queryKey: ["discordData"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/api/auth/discord");
        console.log("API Response Data:", response.data);
        if (response.status === 200) return response.data;
        if (response.status === 404) return [];
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    enabled: fetchDiscordUser,
  });

  return (
    <UserContext.Provider value={{ user, setUser, discordData, setFetchDiscordUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
