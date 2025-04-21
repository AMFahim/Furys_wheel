"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
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
  setFetchAllUserData: (value: boolean) => void;
  allUsersData: any;
  setFetchAllWheelData: (value: boolean) => void;
  allWheelData: any;
  wheelDataLoading: any;
  approvedWheelData: any;
  setFetchApprovedWheelData: (value: boolean) => void;
  setFetchAllWinnerData:(value: boolean) => void;
  allWinnerData: any;
  setFetchApprovedWinners:(value: boolean) => void;
  approvedWinners: any;
  setFetchPendingWinners: (value: boolean) => void;
  pendingWinners: any;
  allWinnerDataLoading:any;
  approvedWheelDataLoading: any;
  setFetchClaimedData: (value: boolean) => void;
  claimedData: any;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [fetchDiscordUser, setFetchDiscordUser] = useState(false);
  const [fetchAllUsersData, setFetchAllUserData] = useState(false);
  const [fetchAllWheelData, setFetchAllWheelData] = useState(false);
  const [fetchApprovedWheelData, setFetchApprovedWheelData] = useState(false);
  const [fetchAllWinnerData, setFetchAllWinnerData] = useState(false);
  const [fetchApprovedWinners, setFetchApprovedWinners] = useState(false);
  const [fetchPendingWinners, setFetchPendingWinners] = useState(false)
  const [fetchClaimedData, setFetchClaimedData] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const fetchUserData = async() => {
   try {
    const res = await axiosInstance.get("/api/auth/userData");
   if(res.data.data){
    setUser(res.data.data);
   }
   } catch (error) {
    console.log(error)
   }
  }

  useEffect(() => {
    fetchUserData();
    // fetchUserData();
  }, []);


// useEffect(() => {
//     // const token = getAuthToken();
//     // console.log("user token", token);
//     // if (token) {
//     //   const userData = verifyToken(token);
//     //   setUser(userData);
//     // }

//     fetchUserData();
//   }, []);

  console.log("user info", user);

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

  const { data: allUsersData } = useQuery({
    queryKey: ["allUsersData"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/api/admin/user");
        console.log("all users data response", response);
        return response.data;
      } catch (error) {
        const errorDetails = handleAxiosError(error as AxiosError);
        toast({
          title: "All User Data Fetch Failed",
          description: errorDetails.message,
          variant: "destructive",
        });

        if (errorDetails.redirect) {
          router.push(errorDetails.redirect);
        }
        return null;
      }
    },
    enabled: fetchAllUsersData,
  });

  const { data: allWheelData, isLoading: wheelDataLoading } = useQuery({
    queryKey: ["allWheelData"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/api/admin/wheel");
        console.log("all wheel data response", response.data);
        return response.data;
      } catch (error) {
        const errorDetails = handleAxiosError(error as AxiosError);
        toast({
          title: "All wheel Data Fetch Failed",
          description: errorDetails.message,
          variant: "destructive",
        });

        if (errorDetails.redirect) {
          router.push(errorDetails.redirect);
        }
        return null;
      }
    },
    enabled: fetchAllWheelData,
  });


  const { data: approvedWheelData, isLoading: approvedWheelDataLoading } = useQuery({
    queryKey: ["approvedWheelData"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/api/admin/wheel?status=APPROVED");
        console.log("approved wheel data response", response.data);
        return response.data;
      } catch (error) {
        const errorDetails = handleAxiosError(error as AxiosError);
        toast({
          title: "Approved wheel Data Fetch Failed",
          description: errorDetails.message,
          variant: "destructive",
        });

        if (errorDetails.redirect) {
          router.push(errorDetails.redirect);
        }
        return null;
      }
    },
    enabled: fetchApprovedWheelData,
  });


  const { data: allWinnerData, isLoading: allWinnerDataLoading } = useQuery({
    queryKey: ["allWinnerData"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/api/admin/winnerSelected");
        console.log("all winner data response", response.data);
        return response.data;
      } catch (error) {
        const errorDetails = handleAxiosError(error as AxiosError);
        toast({
          title: "all winner Data Fetch Failed",
          description: errorDetails.message,
          variant: "destructive",
        });

        if (errorDetails.redirect) {
          router.push(errorDetails.redirect);
        }
        return null;
      }
    },
    enabled: fetchAllWinnerData,
  });


  const { data: approvedWinners, isLoading: approvedWinnersLoading } = useQuery({
    queryKey: ["approvedWinners"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/api/admin/winnerSelected?status=APPROVED");
        console.log("all winner data response", response.data);
        return response.data;
      } catch (error) {
        const errorDetails = handleAxiosError(error as AxiosError);
        toast({
          title: "all approved winner Data Fetch Failed",
          description: errorDetails.message,
          variant: "destructive",
        });

        if (errorDetails.redirect) {
          router.push(errorDetails.redirect);
        }
        return null;
      }
    },
    enabled: fetchApprovedWinners,
  });


  const { data: pendingWinners, isLoading: pendingWinnersLoading } = useQuery({
    queryKey: ["pendingWinners"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/api/admin/winnerSelected?status=PENDING");
        console.log("all pending winners data response", response.data);
        return response.data;
      } catch (error) {
        const errorDetails = handleAxiosError(error as AxiosError);
        toast({
          title: "all pending winner Data Fetch Failed",
          description: errorDetails.message,
          variant: "destructive",
        });

        if (errorDetails.redirect) {
          router.push(errorDetails.redirect);
        }
        return null;
      }
    },
    enabled: fetchPendingWinners,
  });




  const { data: claimedData, isLoading: claimedDataLoading } = useQuery({
    queryKey: ["claimedData"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/api/admin/winnerSelected/user?userId=${user?.id}`);
        console.log("all pending winners data response", response.data);
        return response.data.data;
      } catch (error) {
        const errorDetails = handleAxiosError(error as AxiosError);
        toast({
          title: "all pending winner Data Fetch Failed",
          description: errorDetails.message,
          variant: "destructive",
        });

        if (errorDetails.redirect) {
          router.push(errorDetails.redirect);
        }
        return null;
      }
    },
    enabled: fetchClaimedData,
  });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        discordData,
        setFetchDiscordUser,
        setFetchAllUserData,
        allUsersData,
        allWheelData,
        setFetchAllWheelData,
        wheelDataLoading,
        setFetchApprovedWheelData,
        approvedWheelData,
        setFetchAllWinnerData,
        allWinnerData,
        approvedWinners,
        setFetchApprovedWinners,
        pendingWinners,
        setFetchPendingWinners,
        allWinnerDataLoading,
        approvedWheelDataLoading,
        claimedData,
        setFetchClaimedData

      }}
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
