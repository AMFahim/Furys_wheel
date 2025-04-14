import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { WheelForm } from "@/components/admin/wheel-form"

export default function WheelsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Wheels</h1>
        <Button className="bg-[#6c3cb9] hover:bg-[#5c2ca9]">
          <Plus className="h-4 w-4 mr-2" />
          Add New Wheel
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-[#252547] border-0">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Fortune Wheel</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="text-green-500">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Prizes:</span>
                <span>8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Spins:</span>
                <span>1,245</span>
              </div>
              <div className="mt-4">
                <div className="text-xs mb-1">Prize Distribution</div>
                <div className="w-full h-4 bg-[#1e1e38] rounded-full overflow-hidden flex">
                  <div className="bg-[#4361ee] h-full" style={{ width: "40%" }}></div>
                  <div className="bg-[#6c3cb9] h-full" style={{ width: "25%" }}></div>
                  <div className="bg-[#ffd700] h-full" style={{ width: "20%" }}></div>
                  <div className="bg-[#e63946] h-full" style={{ width: "15%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#252547] border-0">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Mystery Spinner</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="text-green-500">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Prizes:</span>
                <span>6</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Spins:</span>
                <span>876</span>
              </div>
              <div className="mt-4">
                <div className="text-xs mb-1">Prize Distribution</div>
                <div className="w-full h-4 bg-[#1e1e38] rounded-full overflow-hidden flex">
                  <div className="bg-[#4361ee] h-full" style={{ width: "30%" }}></div>
                  <div className="bg-[#6c3cb9] h-full" style={{ width: "30%" }}></div>
                  <div className="bg-[#ffd700] h-full" style={{ width: "25%" }}></div>
                  <div className="bg-[#e63946] h-full" style={{ width: "15%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#252547] border-0">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Jackpot Wheel</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="text-green-500">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Prizes:</span>
                <span>10</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Spins:</span>
                <span>543</span>
              </div>
              <div className="mt-4">
                <div className="text-xs mb-1">Prize Distribution</div>
                <div className="w-full h-4 bg-[#1e1e38] rounded-full overflow-hidden flex">
                  <div className="bg-[#4361ee] h-full" style={{ width: "20%" }}></div>
                  <div className="bg-[#6c3cb9] h-full" style={{ width: "20%" }}></div>
                  <div className="bg-[#ffd700] h-full" style={{ width: "10%" }}></div>
                  <div className="bg-[#e63946] h-full" style={{ width: "50%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#252547] border-0">
        <CardHeader>
          <CardTitle>Add/Edit Wheel</CardTitle>
        </CardHeader>
        <CardContent>
          <WheelForm />
        </CardContent>
      </Card>
    </div>
  )
}
