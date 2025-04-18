"use client";
import FurysWheel from "@/components/furys-wheel";
import { Button } from "../components/ui/button";
import WheelItemsList from "@/components/WheelItemsList";
import GlassWinnersList from "@/components/Glass-winner-list";
import GlassWheelList from "@/components/WheelItemsList";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Toaster } from "sonner";
import { useUser } from "@/providers/UserContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  const { allWheelData, setFetchAllWheelData, user } = useUser();
  const [selectedWheel, setSelectedWheel] = useState<string | null>(null);
  // console.log(user);

  useEffect(() => {
    setFetchAllWheelData(true);
  }, []);

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

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a]">
      <GlassWheelList
        wheels={allWheelData}
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
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border border-purple-500">
                  {user.discordAvatar && (
                    <AvatarImage src={user.discordAvatar} alt="User avatar" />
                  )}
                  <AvatarFallback className="bg-purple-900/20 text-purple-400">
                    {getInitials(user.username)}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-2 bg-[#1a1a3a] border border-purple-500">
                {user.role === "ADMIN" ? (
                  <Link href="/dashboard">
                    <Button
                      variant="ghost"
                      className="w-full text-left text-purple-400 hover:bg-purple-900/20"
                    >
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/profile">
                    <Button
                      variant="ghost"
                      className="w-full text-left text-purple-400 hover:bg-purple-900/20"
                    >
                      Profile
                    </Button>
                  </Link>
                )}
                <Link href="/logout">
                  <Button
                    variant="ghost"
                    className="w-full text-left text-purple-400 hover:bg-purple-900/20"
                  >
                    Logout
                  </Button>
                </Link>
              </PopoverContent>
            </Popover>
          ) : (
            <Link href="/login">
              <Button
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-900/20"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      <GlassWinnersList winners={winners} />
    </main>
  );
}
