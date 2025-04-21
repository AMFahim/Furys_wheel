"use client";
import FurysWheel from "@/components/furys-wheel";
import GlassWinnersList from "@/components/Glass-winner-list";
import GlassWheelList from "@/components/WheelItemsList";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/providers/UserContext";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { setFetchAllWheelData, user, setUser, approvedWheelData, setFetchApprovedWheelData, setFetchApprovedWinners, approvedWinners } = useUser();
  const [selectedWheel, setSelectedWheel] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // setFetchAllWheelData(true);
    setFetchApprovedWheelData(true);
    setFetchApprovedWinners(true);
    
    // Set a timeout to ensure loading state shows for at least a minimum time
    // This helps prevent flashing if data loads very quickly
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(loadingTimer);
  }, [setFetchApprovedWheelData]);

  // Update loading state when user data is available
  useEffect(() => {
    if (user !== undefined) {
      setIsLoading(false);
    }
  }, [user]);

  const wheels = [
    { id: "fortune-wheel", name: "Fortune Wheel", prizes: 8, theme: "gold" },
    {
      id: "mystery-spinner",
      name: "Mystery Spinner",
      prizes: 6,
      theme: "purple",
    },
    { id: "jackpot-wheel", name: "Jackpot Wheel", prizes: 10, theme: "red" },
    { id: "bonus-spinner", name: "Bonus Spinner", prizes: 12, theme: "blue" },
    { id: "daily-rewards", name: "Daily Rewards", prizes: 7, theme: "green" },
    { id: "vip-wheel", name: "VIP Wheel", prizes: 5, theme: "platinum" },
    {
      id: "seasonal-spinner",
      name: "Seasonal Spinner",
      prizes: 8,
      theme: "orange",
    },
    { id: "mega-wheel", name: "Mega Wheel", prizes: 16, theme: "rainbow" },
  ];

  const winners = [
    {
      id: 1,
      name: "Alex Johnson",
      prize: "500 Coins",
      wheel: "Fortune Wheel",
      timestamp: "2 mins ago",
    },
    {
      id: 2,
      name: "Sarah Miller",
      prize: "VIP Access",
      wheel: "VIP Wheel",
      timestamp: "5 mins ago",
    },
    {
      id: 3,
      name: "James Wilson",
      prize: "Mystery Box",
      wheel: "Mystery Spinner",
      timestamp: "12 mins ago",
    },
    {
      id: 4,
      name: "Emma Davis",
      prize: "1000 Coins",
      wheel: "Jackpot Wheel",
      timestamp: "15 mins ago",
    },
    {
      id: 5,
      name: "Michael Brown",
      prize: "Free Spin",
      wheel: "Daily Rewards",
      timestamp: "20 mins ago",
    },
    {
      id: 6,
      name: "Olivia Taylor",
      prize: "Gift Card",
      wheel: "Bonus Spinner",
      timestamp: "25 mins ago",
    },
    {
      id: 7,
      name: "William Jones",
      prize: "Premium Skin",
      wheel: "Seasonal Spinner",
      timestamp: "30 mins ago",
    },
    {
      id: 8,
      name: "Sophia Martinez",
      prize: "Mega Prize",
      wheel: "Mega Wheel",
      timestamp: "35 mins ago",
    },
    {
      id: 9,
      name: "Daniel Anderson",
      prize: "200 Coins",
      wheel: "Fortune Wheel",
      timestamp: "40 mins ago",
    },
    {
      id: 10,
      name: "Isabella Thomas",
      prize: "Rare Item",
      wheel: "Mystery Spinner",
      timestamp: "45 mins ago",
    },
  ];

  const getInitials = (username: string) => {
    return username ? username.charAt(0).toUpperCase() : "U";
  };

  console.log("checking user role", user);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");

      if (setUser) {
        setUser(null);
      }
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading && !approvedWheelData) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a] items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-lg text-gray-300">Loading Fury's Wheel...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a]">
      <GlassWheelList
        wheels={approvedWheelData?.[0]?.wheelOption}
        selectedWheel={selectedWheel}
        onSelectWheel={setSelectedWheel}
      />

      <div className="flex-1 p-8 flex flex-col items-center justify-center">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Fury&apos;s Wheel
          </h1>
          <p className="text-lg text-gray-300">
            Spin the wheel and test your luck. What prize awaits you today?
          </p>
        </div>

        <div>
          <FurysWheel />
        </div>

        <div className="absolute top-4 right-4">
          {user?.role ? (
            <div className="relative group">
              <button className="cursor-pointer">
                <div className="h-10 w-10 rounded-full border border-purple-500 overflow-hidden">
                  {user.discordAvatar ? (
                    <img
                      src={user.discordAvatar}
                      alt="User avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-purple-900/20 text-purple-400">
                      {getInitials(user.username)}
                    </div>
                  )}
                </div>
              </button>

              <div className="absolute right-0 mt-2 w-40 bg-[#1a1a3a] border border-purple-500 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {user.role === "ADMIN" ? (
                  <Link href="/dashboard">
                    <button className="w-full text-left px-4 py-2 text-purple-400 hover:bg-purple-900/20">
                      Dashboard
                    </button>
                  </Link>
                ) : (
                  <Link href="/profile">
                    <button className="w-full text-left px-4 py-2 text-purple-400 hover:bg-purple-900/20">
                      Profile
                    </button>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-purple-400 hover:bg-purple-900/20"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login">
              <button className="px-4 py-2 border border-purple-500 text-purple-400 rounded-md hover:bg-purple-900/20 transition-colors">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      <GlassWinnersList winners={approvedWinners?.data} />
    </main>
  );
}