"use client"
import Link from "next/link"
import { LayoutDashboard, ShipWheelIcon as Wheel, Users, Trophy, Settings, LogOut, ArrowRight } from "lucide-react"
import { useUser } from "@/providers/UserContext"
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const {setFetchAllWheelData, setUser} = useUser();
    const router = useRouter();
  
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

  const handleNavigate = async() => {
    router.push("/")
  }
  return (
    <div className="w-64 bg-[#252547] border-r border-[#3a3a5e] h-screen sticky top-0 flex flex-col">
      <div className="p-6">
        <Link href={"/"} className="text-xl font-bold text-white flex items-center gap-2">
          <Wheel className="h-6 w-6 text-[#6c3cb9]" />
          <span>Wheel Admin</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-[#3a3a5e] text-white"
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Link>

        <Link
          href="/dashboard/wheels"
          onClick={() => setFetchAllWheelData(true)}
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-[#3a3a5e] text-white"
        >
          <Wheel className="h-5 w-5" />
          Manage Wheels
        </Link>

        <Link
          href="/dashboard/users"
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-[#3a3a5e] text-white"
        >
          <Users className="h-5 w-5" />
          Users
        </Link>

        <Link
          href="/dashboard/winners"
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-[#3a3a5e] text-white"
        >
          <Trophy className="h-5 w-5" />
          Approve Winners
        </Link>

        {/* <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-[#3a3a5e] text-white"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link> */}
      </nav>

      <div className="p-4 border-t border-[#3a3a5e]">
      <button   onClick={handleNavigate} className="flex w-full items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-[#3a3a5e] text-white">
          <ArrowRight className="h-5 w-5" />
          Bact to Home
        </button>
        <button   onClick={handleLogout} className="flex w-full items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-[#3a3a5e] text-white">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  )
}
