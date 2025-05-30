"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/admin/overview"
import { Users, ShipWheelIcon as Wheel, Trophy, Award } from "lucide-react"
import { RecentActivity } from "@/components/admin/recent-activity"
import { useUser } from "@/providers/UserContext"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const {allWheelData, allUsersData, setFetchAllUserData, setFetchAllWinnerData, setFetchAllWheelData, allWinnerData, user} = useUser();
  const router = useRouter();

  // console.log("all winnder dashboard data", allWheelData);

  useEffect(() => {
    setFetchAllWheelData(true);
    setFetchAllWinnerData(true);
    setFetchAllUserData(true);
    // if(user?.role !== "ADMIN") {
    //   router.push("/");
    // }
  }, [])


  // useEffect(() => {
  //   if(user?.role !== "USER") {
  //     router.push("/");
  //   }
  // }, [])
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-[#252547] border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Wheels</CardTitle>
            <Wheel className="h-4 w-4 text-[#4361ee]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allWheelData?.length || 0}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#252547] border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-[#4361ee]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allUsersData?.data?.length || 0}</div>
          </CardContent>
        </Card>

        {/* <Card className="bg-[#252547] border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Spins</CardTitle>
            <Award className="h-4 w-4 text-[#4361ee]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9,876</div>
            <p className="text-xs text-muted-foreground">+342 from last week</p>
          </CardContent>
        </Card> */}

        <Card className="bg-[#252547] border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Winners</CardTitle>
            <Trophy className="h-4 w-4 text-[#4361ee]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        {/* <Card className="bg-[#252547] border-0">
          <CardHeader>
            <CardTitle>Wheel Spins Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Overview />
          </CardContent>
        </Card> */}

        <Card className="bg-[#252547] border-0">
          <CardHeader>
            <CardTitle>Recent Winners</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity/>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
