"use client";
import FurysWheel from "@/components/furys-wheel"
import { Button } from "../components/ui/button"
import WheelItemsList from "@/components/WheelItemsList"
import GlassWinnersList from "@/components/Glass-winner-list"
import GlassWheelList from "@/components/WheelItemsList"
import { useEffect, useState } from "react"
import Link from "next/link";
import { Toaster } from "sonner";
import { useUser } from "@/providers/UserContext";

export default function Home() {
  const {allWheelData, setFetchAllWheelData} = useUser()
  const [selectedWheel, setSelectedWheel] = useState<string | null>(null)

  

  useEffect(() => {
    setFetchAllWheelData(true);
  },[])

  const wheels = [
    { id: "fortune-wheel", name: "Fortune Wheel", prizes: 8, theme: "gold" },
    { id: "mystery-spinner", name: "Mystery Spinner", prizes: 6, theme: "purple" },
    { id: "jackpot-wheel", name: "Jackpot Wheel", prizes: 10, theme: "red" },
    { id: "bonus-spinner", name: "Bonus Spinner", prizes: 12, theme: "blue" },
    { id: "daily-rewards", name: "Daily Rewards", prizes: 7, theme: "green" },
    { id: "vip-wheel", name: "VIP Wheel", prizes: 5, theme: "platinum" },
    { id: "seasonal-spinner", name: "Seasonal Spinner", prizes: 8, theme: "orange" },
    { id: "mega-wheel", name: "Mega Wheel", prizes: 16, theme: "rainbow" },
  ]



  const winners = [
    { id: 1, name: "Alex Johnson", prize: "500 Coins", wheel: "Fortune Wheel", timestamp: "2 mins ago" },
    { id: 2, name: "Sarah Miller", prize: "VIP Access", wheel: "VIP Wheel", timestamp: "5 mins ago" },
    { id: 3, name: "James Wilson", prize: "Mystery Box", wheel: "Mystery Spinner", timestamp: "12 mins ago" },
    { id: 4, name: "Emma Davis", prize: "1000 Coins", wheel: "Jackpot Wheel", timestamp: "15 mins ago" },
    { id: 5, name: "Michael Brown", prize: "Free Spin", wheel: "Daily Rewards", timestamp: "20 mins ago" },
    { id: 6, name: "Olivia Taylor", prize: "Gift Card", wheel: "Bonus Spinner", timestamp: "25 mins ago" },
    { id: 7, name: "William Jones", prize: "Premium Skin", wheel: "Seasonal Spinner", timestamp: "30 mins ago" },
    { id: 8, name: "Sophia Martinez", prize: "Mega Prize", wheel: "Mega Wheel", timestamp: "35 mins ago" },
    { id: 9, name: "Daniel Anderson", prize: "200 Coins", wheel: "Fortune Wheel", timestamp: "40 mins ago" },
    { id: 10, name: "Isabella Thomas", prize: "Rare Item", wheel: "Mystery Spinner", timestamp: "45 mins ago" },
  ]
  return (
    // <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-indigo-950 to-black">
    //  <div className="flex justify-between">
    //  <div className="text-center mb-8">
    //     <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 mb-2">
    //       Fury&apos;s Wheel
    //     </h1>
    //     <p className="text-gray-400 max-w-md mx-auto">
    //       Spin the wheel and test your luck. What prize awaits you today?
    //     </p>
    //   </div>
    //   <Button variant="outline" className="border-purple-400 mt-4 rounded-circle hover:bg-indigo-400">Login</Button>
    //  </div>

    //   <div>
    //   <FurysWheel />
    //   <WheelItemsList/>
    //   </div>

    //   {/* <footer className="mt-16 text-gray-500 text-sm">
    //     <p>No login required. Spin and win instantly.</p>
    //   </footer> */}
    //         <GlassWinnersList winners={winners} />

    // </main>
    <>
     <main className="flex min-h-screen bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a]">
      {/* Glass Wheel List Component (Left Sidebar) */}
      <GlassWheelList wheels={allWheelData} selectedWheel={selectedWheel} onSelectWheel={setSelectedWheel} />

      {/* Main Content Area */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Fury&apos;s Wheel
          </h1>
          <p className="text-lg text-gray-300">Spin the wheel and test your luck. What prize awaits you today?</p>
        </div>

        <div>
        <FurysWheel />
        </div>

        <Link href={"/login"} className="absolute top-4 right-4">
          <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-900/20">
            Login
          </Button>
        </Link>
      </div>

      {/* Glass Winners List Component (Right Sidebar) */}
      <GlassWinnersList winners={winners} />
    </main>
    </>
  )
}
