"use client"
import { Bell, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useUser } from "@/providers/UserContext"

export function Header() {
  const {user} = useUser();
  if (!user) {

     <h1>Loading...</h1>;
  }
  console.log("user data", user);
  return (
    <header className="h-16 border-b border-[#3a3a5e] bg-[#252547] px-6 flex items-center justify-end sticky top-0 z-10">
      {/* <div className="relative w-64">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search..." className="pl-8 bg-[#1e1e38] border-[#3a3a5e] focus:border-[#4361ee] w-full" />
      </div> */}

      <div className="flex items-center gap-4">
        {/* <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button> */}

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium">{user?.role}</div>
            <div className="text-xs text-muted-foreground">{user?.username}</div>
          </div>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-[#4361ee]">AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
