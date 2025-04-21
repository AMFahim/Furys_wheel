"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Check, X, Trophy, Loader2 } from "lucide-react"
import axiosInstance from "@/utils/axiosInstance"
import { useUser } from "@/providers/UserContext"
import { useEffect } from "react"
import Link from "next/link"
import { toast } from "sonner"

export default function WinnersPage() {

  const {allWinnerData, setFetchAllWinnerData, pendingWinners, setFetchApprovedWinners, setFetchPendingWinners, approvedWinners, approvedWheelDataLoading} = useUser();
  console.log("response allwoinner data", allWinnerData);

  useEffect(() => {
    setFetchAllWinnerData(true);
  },[])


  const handleApprovePending = async(winner:any) => {
    try {
      if(winner.status==="PENDING"){
        const res = await axiosInstance.put(`/api/admin/winnerSelected?id=${winner.id}`, {status: "APPROVED"})
        console.log("resonse APPROVED the update", res);
        setFetchAllWinnerData(true);
        toast.success(`${winner.user.username} Approved!`)
      } else {
        const res = await axiosInstance.put(`/api/admin/winnerSelected?id=${winner.id}`, {status: "PENDING"})
        console.log("resonse PENDING the update", res);
        setFetchAllWinnerData(true);
        toast.success(`${winner.user.username} Pending now!`)
      }
    } catch (error) {
      console.log(error);
    }

  }

  if(approvedWheelDataLoading && !approvedWinners){
    <div className="text-center flex flex-column items-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-lg text-gray-300">Loading</p>
        </div>
      
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Winner Approval</h1>
        <Link href={"/"}>
        <Button className="bg-[#6c3cb9] hover:bg-[#5c2ca9]">
          <Trophy className="h-4 w-4 mr-2" />
          View Public Winners Page
        </Button>
        </Link>
    
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-[#1e1e38] w-full justify-start">
          <TabsTrigger value="all" className="relative">
           All Winners
            <Badge className="ml-2 bg-[#e63946]">{allWinnerData?.data?.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="approved" onClick={() => setFetchApprovedWinners(true)}>Approved Winners</TabsTrigger>
          <TabsTrigger value="rejected" onClick={() => setFetchPendingWinners(true)}>Pending</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {allWinnerData?.data?.map((winner:any) => (
            <Card key={winner.id} className="bg-[#252547] border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={winner.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[#4361ee]">{winner?.user?.username}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{winner?.user?.username}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        Won <span className="text-[#ffd700]">{winner.wheelReward}</span> on {winner.wheelName}
                      </span>
                      {/* <span>•</span>
                      <span>{winner.time}</span> */}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => handleApprovePending(winner)} className={`${winner.status==="PENDING"? "border-red-500 text-red-500 hover:bg-red-500/10": "bg-green-600 hover:bg-green-700"}`}>
                    {winner.status==="PENDING"?<X className="h-4 w-4 mr-2" />: <Check className="h-4 w-4 mr-2" />}  
                      {winner.status==="PENDING"?"Pending":"APPROVED"}
                    </Button>
                    {/* <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4 mt-6">
          {approvedWinners?.data?.map((winner:any) => (
            <Card key={winner.id} className="bg-[#252547] border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={winner.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[#4361ee]">{winner?.user?.username}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{winner?.user?.username}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        Won <span className="text-[#ffd700]">{winner.wheelReward}</span> on {winner.wheelName}
                      </span>
                      {/* <span>•</span>
                      <span>{winner.time}</span> */}
                    </div>
                  </div>

                  {/* <Badge className="bg-green-600">Approved</Badge> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">

        {pendingWinners ? pendingWinners?.data?.map((winner:any) => (
            <Card key={winner.id} className="bg-[#252547] border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={winner.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[#4361ee]">{winner?.user?.username}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{winner?.user?.username}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        Won <span className="text-[#ffd700]">{winner.wheelReward}</span> on {winner.wheelName}
                      </span>
                      {/* <span>•</span>
                      <span>{winner.time}</span> */}
                    </div>
                  </div>

                  {/* <Badge className="bg-green-600">Approved</Badge> */}
                </div>
              </CardContent>
            </Card>
          )):  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
          <div className="rounded-full bg-[#1e1e38] p-4 mb-4">
            <X className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium mb-1">No Pending Winners</h3>
          <p className="text-sm">There are no Pending winners at the moment.</p>
        </div>}
         
        </TabsContent>
      </Tabs>
    </div>
  )
}
