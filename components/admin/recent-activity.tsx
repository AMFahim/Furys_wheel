"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@/providers/UserContext"

export function RecentActivity() {
  const {allWinnerData, allWinnerDataLoading} = useUser()
  
  if(allWinnerDataLoading){
    <div>Loading....</div>
  }
  return (
    <div className="space-y-4">
      {allWinnerData && allWinnerData?.data.slice(-5).map((winner: any, i:number) => (
        <div key={i} className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={winner.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-[#4361ee] text-xs">{winner.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{winner.user.username}</p>
            <p className="text-xs text-muted-foreground">Won <span className="text-[#ffd700]">{winner.wheelReward}</span> on {winner.wheelName}</p>
          </div>
          {/* <div className="text-xs text-muted-foreground">{activity.time}</div> */}
        </div>
      ))}
    </div>
  )
}
