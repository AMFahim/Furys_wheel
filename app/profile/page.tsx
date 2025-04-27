"use client";

import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { UserProfile } from "@/components/user-profile";
import { useUser } from "@/providers/UserContext";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define TypeScript interfaces
interface WinPrize {
  id: string;
  wheelReward: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  claimed?: boolean;
}

// interface User {
//   id: string;
//   username: string;
//   discordAvatar?: string;
//   winPrize?: WinPrize[];
// }

export type GiftType = 'wheel' | 'item' | 'currency' | 'status';

interface ClaimedGift {
  name: string;
  type: GiftType;
  claimedAt: string;
}

export default function ProfilePage() {
  const { user, claimedData, setFetchClaimedData,fetchUserData
  } = useUser() as { user: any | null, claimedData: any, setFetchClaimedData: (value: boolean) => void, fetchUserData:any };
  // const [claimedData, setClaimedData] = useState<WinPrize[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  
  useEffect(() => {
    if (user) {
      setFetchClaimedData(true)
      fetchUserData();
      console.log("win prize");
    }
  }, [user?.winPrize]);

  // useEffect(() => {
  //  fetchClaimed();
  // }, []);

  // useEffect(() => {
  //   if(user?.role !== "USER") {
  //     router.push("/");
  //   }
  // }, [])

  // const fetchClaimed = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await axiosInstance.get(`/api/admin/winnerSelected/user?userId=${user?.id}`);

  //     // console.log("profile data", res);
  //     if (res.data.data) {
  //       setClaimedData(res.data.data);
  //     }
  //     setIsLoading(false);

  //   } catch (error) {
  //     console.error("Error fetching claimed data:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const formatClaimedGifts = (): ClaimedGift[] => {
    if (!user?.winPrize) return [];
    
    return user.winPrize.map((prize:any) => ({
      name: prize.wheelReward,
      type: getGiftType(prize.wheelReward),
      claimedAt: new Date(prize.updatedAt || prize.createdAt).toLocaleDateString()
    }));
  };

  console.log("claimed data", claimedData);
  console.log("user data", user);


  // const formatClaimedGifts = (): ClaimedGift[] => {
  //   if (!claimedData) return [];
  
  //   return claimedData.map((prize: any) => ({
  //     name: prize.wheelReward,
  //     type: getGiftType(prize.wheelReward),
  //     claimedAt: new Date(prize.updatedAt || prize.createdAt).toLocaleDateString()
  //   }));
  // };
  

  const getGiftType = (rewardName: string): GiftType => {
    const lowerName = rewardName?.toLowerCase();
    if (lowerName.includes('wheel') || lowerName.includes('spin')) return 'wheel';
    if (lowerName.includes('box') || lowerName.includes('headphones')) return 'item';
    if (lowerName.includes('coin') || lowerName.includes('cash')) return 'currency';
    return 'status'; 
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] text-white p-4 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#1a1a2e] text-white p-4 flex items-center justify-center">
      {isLoading ? (
        <div className="text-center">
          <LoadingSpinner message="Loading your claimed rewards..." />
        </div>
      ) : (
        <UserProfile
          username={user.username}
          avatarUrl={user.discordAvatar || "/api/placeholder/100/100"}
          // userRank={1}
          claimedGifts={user.winPrize && user.winPrize ? formatClaimedGifts() : []}
        />
      )}
    </main>
  );
}

