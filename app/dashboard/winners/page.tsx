import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Check, X, Trophy } from "lucide-react"

export default function WinnersPage() {
  const pendingWinners = [
    {
      id: 1,
      name: "Alex Johnson",
      prize: "500 Coins",
      wheel: "Fortune Wheel",
      time: "2 mins ago",
      avatar: "/placeholder.svg?height=48&width=48",
      initials: "AJ",
    },
    {
      id: 2,
      name: "Sarah Miller",
      prize: "VIP Access",
      wheel: "VIP Wheel",
      time: "5 mins ago",
      avatar: "/placeholder.svg?height=48&width=48",
      initials: "SM",
    },
    {
      id: 3,
      name: "James Wilson",
      prize: "Mystery Box",
      wheel: "Mystery Spinner",
      time: "12 mins ago",
      avatar: "/placeholder.svg?height=48&width=48",
      initials: "JW",
    },
  ]

  const approvedWinners = [
    {
      id: 4,
      name: "Emma Davis",
      prize: "1000 Coins",
      wheel: "Jackpot Wheel",
      time: "30 mins ago",
      avatar: "/placeholder.svg?height=48&width=48",
      initials: "ED",
    },
    {
      id: 5,
      name: "Michael Brown",
      prize: "Premium Pack",
      wheel: "Daily Rewards",
      time: "1 hour ago",
      avatar: "/placeholder.svg?height=48&width=48",
      initials: "MB",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Winner Approval</h1>
        <Button className="bg-[#6c3cb9] hover:bg-[#5c2ca9]">
          <Trophy className="h-4 w-4 mr-2" />
          View Public Winners Page
        </Button>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="bg-[#1e1e38] w-full justify-start">
          <TabsTrigger value="pending" className="relative">
            Pending Approval
            <Badge className="ml-2 bg-[#e63946]">{pendingWinners.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="approved">Approved Winners</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 mt-6">
          {pendingWinners.map((winner) => (
            <Card key={winner.id} className="bg-[#252547] border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={winner.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[#4361ee]">{winner.initials}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{winner.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        Won <span className="text-[#ffd700]">{winner.prize}</span> on {winner.wheel}
                      </span>
                      <span>•</span>
                      <span>{winner.time}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4 mt-6">
          {approvedWinners.map((winner) => (
            <Card key={winner.id} className="bg-[#252547] border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={winner.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[#4361ee]">{winner.initials}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{winner.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        Won <span className="text-[#ffd700]">{winner.prize}</span> on {winner.wheel}
                      </span>
                      <span>•</span>
                      <span>{winner.time}</span>
                    </div>
                  </div>

                  <Badge className="bg-green-600">Approved</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <div className="rounded-full bg-[#1e1e38] p-4 mb-4">
              <X className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium mb-1">No Rejected Winners</h3>
            <p className="text-sm">There are no rejected winners at the moment.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
