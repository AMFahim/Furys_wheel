import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/admin/overview"
import { Users, ShipWheelIcon as Wheel, Trophy, Award } from "lucide-react"
import { RecentActivity } from "@/components/admin/recent-activity"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#252547] border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Wheels</CardTitle>
            <Wheel className="h-4 w-4 text-[#4361ee]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+1 from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-[#252547] border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-[#4361ee]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+21 from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-[#252547] border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Spins</CardTitle>
            <Award className="h-4 w-4 text-[#4361ee]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9,876</div>
            <p className="text-xs text-muted-foreground">+342 from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-[#252547] border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Winners</CardTitle>
            <Trophy className="h-4 w-4 text-[#4361ee]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-[#252547] border-0">
          <CardHeader>
            <CardTitle>Wheel Spins Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Overview />
          </CardContent>
        </Card>

        <Card className="bg-[#252547] border-0">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity/>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
