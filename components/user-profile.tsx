import { Trophy, Gift, Clock, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

type GiftType = {
  name: string
  type: "wheel" | "currency" | "item" | "status"
  claimedAt: string
}

interface UserProfileProps {
  username: string
  avatarUrl: string
  userRank: number
  claimedGifts: GiftType[]
}

export function UserProfile({ username, avatarUrl, userRank, claimedGifts }: UserProfileProps) {
  return (
    <Card className="w-full max-w-md border-0 bg-[#252547] bg-opacity-90 shadow-xl overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-[#6c3cb9] to-[#4361ee]"></div>

      <div className="px-6 pb-6">
        <div className="flex items-end -mt-12 mb-4">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-[#252547]">
              <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={username} />
              <AvatarFallback className="bg-[#4361ee] text-white text-2xl">
                {username
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="ml-4 flex-1">
            <h2 className="text-2xl font-bold text-white">{username}</h2>
            <div className="flex items-center gap-2 text-[#a0a0d9]">
              <Star className="h-4 w-4 fill-[#ffd700] text-[#ffd700]" />
              <span>Furys Wheel Rewards</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Gift className="h-5 w-5 text-[#6c3cb9]" />
            <h3 className="text-lg font-semibold text-white">Claimed Rewards</h3>
          </div>

          <div className="space-y-3">
            {claimedGifts.map((gift, index) => (
              <div key={index} className="bg-[#1e1e38] rounded-lg p-3 flex items-center">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-[#4361ee]">
                  {gift.type === "wheel" && <Trophy className="h-5 w-5" />}
                  {gift.type === "currency" && <Star className="h-5 w-5" />}
                  {gift.type === "item" && <Gift className="h-5 w-5" />}
                  {gift.type === "status" && <Badge className="h-5 w-5" />}
                </div>

                <div className="ml-3 flex-1">
                  <div className="font-medium text-white">{gift.name}</div>
                  <div className="text-xs text-[#a0a0d9] flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {gift.claimedAt}
                  </div>
                </div>

                <Badge className="bg-[#6c3cb9] hover:bg-[#5c2ca9] text-white">Claimed</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-xs text-[#a0a0d9]">Total Spins</div>
          </div>
          <Separator orientation="vertical" className="h-12 bg-[#3a3a5e]" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">4</div>
            <div className="text-xs text-[#a0a0d9]">Rewards</div>
          </div>
          <Separator orientation="vertical" className="h-12 bg-[#3a3a5e]" />
          <div className="text-center">
            <div className="text-2xl font-bold text-[#ffd700]">500</div>
            <div className="text-xs text-[#a0a0d9]">Coins</div>
          </div>
        </div>
        <div className="text-center my-4"> <Link href="/"  > Go to Home Page, Spin and Win</Link></div>
       
      </div>
    </Card>
  )
}
