import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"

export default function UsersPage() {
  const users = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      status: "active",
      spins: 45,
      joined: "2023-10-15",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AJ",
    },
    {
      id: 2,
      name: "Sarah Miller",
      email: "sarah@example.com",
      status: "active",
      spins: 32,
      joined: "2023-10-18",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SM",
    },
    {
      id: 3,
      name: "James Wilson",
      email: "james@example.com",
      status: "active",
      spins: 28,
      joined: "2023-10-20",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JW",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma@example.com",
      status: "inactive",
      spins: 12,
      joined: "2023-10-25",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ED",
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael@example.com",
      status: "active",
      spins: 19,
      joined: "2023-10-28",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MB",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>
        <Button className="bg-[#6c3cb9] hover:bg-[#5c2ca9]">Export Users</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8 bg-[#1e1e38] border-[#3a3a5e] focus:border-[#4361ee] w-full"
          />
        </div>

        <div className="flex gap-2">
          <div className="flex items-center gap-2 bg-[#1e1e38] border border-[#3a3a5e] rounded-md px-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select defaultValue="all">
              <SelectTrigger className="border-0 bg-transparent p-0 h-9 w-[120px] focus:ring-0">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline">Reset</Button>
        </div>
      </div>

      <div className="rounded-md border border-[#3a3a5e] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#252547]">
            <TableRow className="hover:bg-[#2a2a4e] border-[#3a3a5e]">
              <TableHead className="text-white">User</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Total Spins</TableHead>
              <TableHead className="text-white">Joined Date</TableHead>
              <TableHead className="text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-[#2a2a4e] border-[#3a3a5e]">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-[#4361ee]">{user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div>{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={user.status === "active" ? "bg-green-500" : "bg-gray-500"}>{user.status}</Badge>
                </TableCell>
                <TableCell>{user.spins}</TableCell>
                <TableCell>{user.joined}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Showing 5 of 100 users</div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-[#3a3a5e]">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
