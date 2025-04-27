// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Trash2, Plus } from "lucide-react"

// export function WheelForm() {
//   return (
//     <form className="space-y-6">
//       <div className="grid gap-4 md:grid-cols-2">
//         <div className="space-y-2">
//           <Label htmlFor="name">Wheel Name</Label>
//           <Input id="name" placeholder="Enter wheel name" className="bg-[#1e1e38] border-[#3a3a5e]" />
//         </div>

//         {/* <div className="space-y-2">
//           <Label htmlFor="description">Description</Label>
//           <Input id="description" placeholder="Enter description" className="bg-[#1e1e38] border-[#3a3a5e]" />
//         </div> */}
//       </div>

//       {/* <div className="flex items-center space-x-2">
//         <Switch id="active" defaultChecked />
//         <Label htmlFor="active">Active</Label>
//       </div> */}

//       <Tabs defaultValue="prizes">
//         <TabsList className="bg-[#1e1e38]">
//           <TabsTrigger value="prizes">Prizes & Probabilities</TabsTrigger>
//           {/* <TabsTrigger value="appearance">Appearance</TabsTrigger>
//           <TabsTrigger value="settings">Settings</TabsTrigger> */}
//         </TabsList>

//         <TabsContent value="prizes" className="space-y-4 pt-4">
//           <div className="flex justify-between items-center">
//             <h3 className="text-lg font-medium">Prize Segments</h3>
        
//           </div>

//           {[1, 2, 3, 4, 5, 6, 7,8].map((i) => (
//             <div key={i} className="grid gap-4 md:grid-cols-2 items-end border-b border-[#3a3a5e] pb-4">
//               <div className="space-y-2">
//                 <Label htmlFor={`prize-${i}`}>Prize Name</Label>
//                 <Input
//                   id={`prize-${i}`}
//                   placeholder="Enter prize name"
//                   defaultValue={`Prize ${i}`}
//                   className="bg-[#1e1e38] border-[#3a3a5e]"
//                 />
//               </div>


//               <div className="space-y-2">
//                 <Label htmlFor={`percentage-${i}`}>percentage (%)</Label>
//                 <Input
//                   id={`percentage-${i}`}
//                   type="number"
//                   placeholder="Enter percentage"
//                   defaultValue={i === 1 ? "40" : i === 2 ? "30" : i === 3 ? "20" : "10"}
//                   className="bg-[#1e1e38] border-[#3a3a5e]"
//                 />
//               </div>

//             </div>
//           ))}

//           <div className="flex justify-between items-center pt-4">
//             <div>
//               <span className="text-sm text-muted-foreground">Total percentage:</span>
//               <span className="ml-2 font-medium">100%</span>
//             </div>
//             <div className="text-xs text-yellow-400">* Total percentage must equal 100%</div>
//           </div>
//         </TabsContent>

//         {/* <TabsContent value="appearance" className="space-y-4 pt-4">
//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="space-y-2">
//               <Label htmlFor="primary-color">Primary Color</Label>
//               <div className="flex gap-2">
//                 <Input id="primary-color" defaultValue="#4361ee" className="bg-[#1e1e38] border-[#3a3a5e]" />
//                 <div className="w-10 h-10 rounded bg-[#4361ee]"></div>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="secondary-color">Secondary Color</Label>
//               <div className="flex gap-2">
//                 <Input id="secondary-color" defaultValue="#6c3cb9" className="bg-[#1e1e38] border-[#3a3a5e]" />
//                 <div className="w-10 h-10 rounded bg-[#6c3cb9]"></div>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="wheel-image">Wheel Image (Optional)</Label>
//             <Input id="wheel-image" type="file" className="bg-[#1e1e38] border-[#3a3a5e]" />
//           </div>
//         </TabsContent>

//         <TabsContent value="settings" className="space-y-4 pt-4">
//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="space-y-2">
//               <Label htmlFor="spin-duration">Spin Duration (seconds)</Label>
//               <Input id="spin-duration" type="number" defaultValue="5" className="bg-[#1e1e38] border-[#3a3a5e]" />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="max-spins">Max Spins Per User (daily)</Label>
//               <Input id="max-spins" type="number" defaultValue="3" className="bg-[#1e1e38] border-[#3a3a5e]" />
//             </div>
//           </div>

//           <div className="flex items-center space-x-2">
//             <Switch id="require-approval" defaultChecked />
//             <Label htmlFor="require-approval">Require Winner Approval</Label>
//           </div>
//         </TabsContent> */}
//       </Tabs>

//       <div className="flex justify-end gap-2">
//         <Button variant="outline">Cancel</Button>
//         <Button className="bg-[#6c3cb9] hover:bg-[#5c2ca9]">Save Wheel</Button>
//       </div>
//     </form>
//   )
// }



"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import axiosInstance from "@/utils/axiosInstance"
import { useUser } from "@/providers/UserContext"

type PropsType = {
  setIsWheelFormDisplay: Dispatch<SetStateAction<boolean>>;
  wheelId: string;
}

export function WheelForm({setIsWheelFormDisplay, wheelId}: PropsType) {
  // const {allWheelData} = useUser()
  const [wheelName, setWheelName] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [prizes, setPrizes] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      name: `Prize ${i + 1}`,
      percentage: 0,
    }))
  )

  const handlePrizeChange = (index: number, key: "name" | "percentage", value: string) => {
    const updated = [...prizes]
    updated[index] = {
      ...updated[index],
      [key]: key === "percentage" ? Number(value) : value
    } as typeof updated[number] // tell TS you're sure

    // Calculate the total percentage after the change
    const totalpercentage = updated.reduce((sum, prize) => sum + prize.percentage, 0)

    // If the total percentage exceeds 100, show an error
    if (key === "percentage" && totalpercentage > 100) {
      toast.error("Total percentage cannot exceed 100%")
      return
    }

    setPrizes(updated)
  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate total percentage
    const totalpercentage = prizes.reduce((sum, prize) => sum + prize.percentage, 0);
    if (totalpercentage !== 100) {
      toast.error("Total percentage must equal 100%");
      return;
    }
  
    // Generate unique colors (you can improve this logic later)
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F39C12", "#9B59B6", "#1ABC9C", "#E74C3C", "#2980B9"];
  
    const wheelOptions = prizes.map((prize, index) => ({
      name: prize.name,
      percentage: prize.percentage,
      colour: colors[index % colors.length],
    }));
  
    const formData = {
      name: wheelName,
      wheelOption: wheelOptions,
    };

    setIsLoading(true);
  
    try {
      if(wheelId){
        const response = await axiosInstance.put(`/api/admin/wheel?id=${wheelId}`, formData)
        console.log("Wheel update:", response.data);
        toast.success("Wheel successfully Updated!");
        setIsWheelFormDisplay(false);
        window.location.reload()
      }else {
        const response = await axiosInstance.post("/api/admin/wheel", formData);
        console.log("Wheel Created:", response.data);
        console.log("Submitted Data Format:", JSON.stringify(formData, null, 2));
        toast.success("Wheel successfully created!");
        setIsWheelFormDisplay(false);
        window.location.reload();
      }
    
    } catch (error) {
      console.error("Error creating wheel:", error);
      toast.error("Something went wrong.");
    }finally{
      setIsLoading(false)
    }
  };
  
  

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Wheel Name</Label>
          <Input
            id="name"
            placeholder="Enter wheel name"
            value={wheelName}
            onChange={(e) => setWheelName(e.target.value)}
            className="bg-[#1e1e38] border-[#3a3a5e]"
          />
        </div>
      </div>

      <Tabs defaultValue="prizes">
        <TabsList className="bg-[#1e1e38]">
          <TabsTrigger value="prizes">Prizes & Probabilities</TabsTrigger>
        </TabsList>

        <TabsContent value="prizes" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Prize Segments</h3>
          </div>

          {prizes.map((prize, i) => (
            <div
              key={i}
              className="grid gap-4 md:grid-cols-2 items-end border-b border-[#3a3a5e] pb-4"
            >
              <div className="space-y-2">
                <Label htmlFor={`prize-${i}`}>Prize Name</Label>
                <Input
                  id={`prize-${i}`}
                  placeholder="Enter prize name"
                  value={prize.name}
                  onChange={(e) => handlePrizeChange(i, "name", e.target.value)}
                  className="bg-[#1e1e38] border-[#3a3a5e]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`percentage-${i}`}>percentage (%)</Label>
                <Input
                  id={`percentage-${i}`}
                  type="number"
                  placeholder="Enter percentage"
                  value={prize.percentage}
                  onChange={(e) => handlePrizeChange(i, "percentage", e.target.value)}
                  className="bg-[#1e1e38] border-[#3a3a5e]"
                />
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4">
            <div>
              <span className="text-sm text-muted-foreground">Total percentage:</span>
              <span className="ml-2 font-medium">
                {prizes.reduce((acc, p) => acc + p.percentage, 0)}%
              </span>
            </div>
            <div className="text-xs text-yellow-400">* Total percentage must equal 100%</div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => setIsWheelFormDisplay(false)}>
          Cancel
        </Button>
        <Button type="submit" className="bg-[#6c3cb9] hover:bg-[#5c2ca9]">
          {
            isLoading?"Saving...":"Save Wheel"
          }
         
        </Button>
      </div>
    </form>
  )
}
