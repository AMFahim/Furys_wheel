"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { WheelForm } from "@/components/admin/wheel-form";
import { useUser } from "@/providers/UserContext";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

export default function WheelsPage() {
  const { setFetchAllWheelData, allWheelData } = useUser();
  const [isWheelFormDisplay, setIsWheelFormDisplay] = useState(false);
  const [wheelId, setWheelId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedWheelId, setSelectedWheelId] = useState("");
  const [wheelStatuses, setWheelStatuses] = useState<Record<string, boolean>>(
    {}
  );
const [isLoadingWheelStatus, setIsLoadingWheelStatus] = useState(false);
  const toggleStatus = async(wheel:any) => {
    console.log("wheel of aproveal", {
      id: wheel.id,
      name: wheel.name,
      status: "APPROVED",
      wheelOption: wheel.wheelOption
    });

    const approvedPayload = {
      id: wheel.id,
      name: wheel.name,
      status: "APPROVED",
      wheelOption: wheel.wheelOption
    }

    const pendingPayload = {
      id: wheel.id,
      name: wheel.name,
      status: "PENDING",
      wheelOption: wheel.wheelOption
    }
    setIsLoadingWheelStatus(true)
  try {
    if(wheel.status==="PENDING"){
      const res = await axiosInstance.put(`/api/admin/wheel?id=${wheel.id}`, approvedPayload)
      console.log("resonse approved the update", res);
      setFetchAllWheelData(true);
      toast.success(`${wheel.name} updated successfully! Kindly refresh the window`)
     } else {
      const res = await axiosInstance.put(`/api/admin/wheel?id=${wheel.id}`, pendingPayload)
      console.log("resonse pending the update", res);
      toast.success(`${wheel.name} updated successfully! Kindly refresh the window`)
      setFetchAllWheelData(true);
     }
  } catch (error) {
    toast.error("someting went wrong!")
  }finally{
    setIsLoadingWheelStatus(false);
  }
    // setStatus((prev) => (prev === "ACTIVE" ? "INACTIVE" : "ACTIVE"));
  };

  console.log("allwheel data", allWheelData);

  // const isApproved = status === "ACTIVE";

  useEffect(() => {
    setFetchAllWheelData(true);
  }, []);

  const confirmDelete = (id: string) => {
    setSelectedWheelId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteWheel = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.delete(
        `/api/admin/wheel?id=${selectedWheelId}`
      );
      toast.success("Wheel Successfully Deleted!");
      setFetchAllWheelData(true);
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  const handleEditWheel = (id: string) => {
    setWheelId(id);
    setIsWheelFormDisplay(true);
  };

  // const handleActive = async() => {
    
  // }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Wheels</h1>
        <Button
          className="bg-[#6c3cb9] hover:bg-[#5c2ca9]"
          onClick={() => setIsWheelFormDisplay(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Wheel
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allWheelData?.map((wheel: any, index: number) => (
          <Card key={index} className="bg-[#252547] border-0">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>{wheel.name}</span>
                <div className="flex gap-2">
                  {/* <Switch
            checked={wheelStatuses[wheel.id] || false}
            onCheckedChange={() => toggleStatus(wheel.id)}
          /> */}

                  <Button
                    onClick={() => handleEditWheel(wheel.id)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => confirmDelete(wheel.id)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  {/* <span className="text-green-500">Active</span> */}
                  <button
                    onClick={() =>toggleStatus(wheel)}
                    className={`px-6 py-1 rounded-full font-semibold transition-all duration-300${ wheel.status ==="APPROVED" ? " text-green-800"
            : "border border-[#5c2ca9] text-[#5c2ca9]"}
        hover:opacity-90 bg-white`}
                  >
                    {isLoadingWheelStatus ? "...": wheel.status}
                  </button>
                </div>
                <div className="flex justify-between">
                  <span>Prizes:</span>
                  <span>{wheel?.wheelOption?.length}</span>
                </div>
                <div className="mt-4">
                  <div className="text-xs mb-1">Prize Distribution</div>
                  <div className="w-full h-4 bg-[#1e1e38] rounded-full overflow-hidden flex">
                    {wheel?.wheelOption?.map((segment: any, i: number) => (
                      <div
                        key={i}
                        className="h-full"
                        style={{
                          width: `${segment.percentage}%`,
                          backgroundColor: segment.colour,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isWheelFormDisplay && (
        <Card className="bg-[#252547] border-0">
          <CardHeader>
            <CardTitle>Add/Edit Wheel</CardTitle>
          </CardHeader>
          <CardContent>
            <WheelForm
              setIsWheelFormDisplay={setIsWheelFormDisplay}
              wheelId={wheelId}
            />
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 rounded-xl">
          <div className="bg-[#252547] p-6 rounded-lg w-[90%] max-w-sm text-center space-y-4">
            <h2 className="text-xl font-semibold text-red-500">
              Confirm Deletion
            </h2>
            <p>
              Are you sure you want to delete this wheel? This action cannot be
              undone.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="ghost"
                className="border rounded"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600 rounded"
                onClick={handleDeleteWheel}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
