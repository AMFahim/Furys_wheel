import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  const activities = [
    {
      user: "Alex Johnson",
      action: "won 500 Coins on Fortune Wheel",
      time: "2 mins ago",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
    },
    {
      user: "Sarah Miller",
      action: "won VIP Access on VIP Wheel",
      time: "5 mins ago",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SM",
    },
    {
      user: "James Wilson",
      action: "won Mystery Box on Mystery Spinner",
      time: "12 mins ago",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JW",
    },
    {
      user: "Emma Davis",
      action: "registered a new account",
      time: "30 mins ago",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ED",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity, i) => (
        <div key={i} className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-[#4361ee] text-xs">{activity.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user}</p>
            <p className="text-xs text-muted-foreground">{activity.action}</p>
          </div>
          <div className="text-xs text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}
