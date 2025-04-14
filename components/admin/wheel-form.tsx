import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Plus } from "lucide-react"

export function WheelForm() {
  return (
    <form className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Wheel Name</Label>
          <Input id="name" placeholder="Enter wheel name" className="bg-[#1e1e38] border-[#3a3a5e]" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" placeholder="Enter description" className="bg-[#1e1e38] border-[#3a3a5e]" />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="active" defaultChecked />
        <Label htmlFor="active">Active</Label>
      </div>

      <Tabs defaultValue="prizes">
        <TabsList className="bg-[#1e1e38]">
          <TabsTrigger value="prizes">Prizes & Probabilities</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="prizes" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Prize Segments</h3>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Prize
            </Button>
          </div>

          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="grid gap-4 md:grid-cols-4 items-end border-b border-[#3a3a5e] pb-4">
              <div className="space-y-2">
                <Label htmlFor={`prize-${i}`}>Prize Name</Label>
                <Input
                  id={`prize-${i}`}
                  placeholder="Enter prize name"
                  defaultValue={`Prize ${i}`}
                  className="bg-[#1e1e38] border-[#3a3a5e]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`value-${i}`}>Value</Label>
                <Input
                  id={`value-${i}`}
                  placeholder="Enter value"
                  defaultValue={i === 1 ? "500 Coins" : i === 2 ? "VIP Access" : "Mystery Box"}
                  className="bg-[#1e1e38] border-[#3a3a5e]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`probability-${i}`}>Probability (%)</Label>
                <Input
                  id={`probability-${i}`}
                  type="number"
                  placeholder="Enter probability"
                  defaultValue={i === 1 ? "40" : i === 2 ? "30" : i === 3 ? "20" : "10"}
                  className="bg-[#1e1e38] border-[#3a3a5e]"
                />
              </div>

              <Button variant="ghost" size="icon" className="text-red-500 h-10 w-10">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4">
            <div>
              <span className="text-sm text-muted-foreground">Total Probability:</span>
              <span className="ml-2 font-medium">100%</span>
            </div>
            <div className="text-xs text-yellow-400">* Total probability must equal 100%</div>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex gap-2">
                <Input id="primary-color" defaultValue="#4361ee" className="bg-[#1e1e38] border-[#3a3a5e]" />
                <div className="w-10 h-10 rounded bg-[#4361ee]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex gap-2">
                <Input id="secondary-color" defaultValue="#6c3cb9" className="bg-[#1e1e38] border-[#3a3a5e]" />
                <div className="w-10 h-10 rounded bg-[#6c3cb9]"></div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wheel-image">Wheel Image (Optional)</Label>
            <Input id="wheel-image" type="file" className="bg-[#1e1e38] border-[#3a3a5e]" />
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="spin-duration">Spin Duration (seconds)</Label>
              <Input id="spin-duration" type="number" defaultValue="5" className="bg-[#1e1e38] border-[#3a3a5e]" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-spins">Max Spins Per User (daily)</Label>
              <Input id="max-spins" type="number" defaultValue="3" className="bg-[#1e1e38] border-[#3a3a5e]" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="require-approval" defaultChecked />
            <Label htmlFor="require-approval">Require Winner Approval</Label>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-[#6c3cb9] hover:bg-[#5c2ca9]">Save Wheel</Button>
      </div>
    </form>
  )
}
