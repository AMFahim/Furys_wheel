"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useUser } from "@/providers/UserContext"

export default function UsersPage() {
  const { allUsersData, setFetchAllUserData, wheelDataLoading } = useUser()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredUsers, setFilteredUsers] = useState([])
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    setFetchAllUserData(true)
  }, [])

  useEffect(() => {
    if (allUsersData?.data) {
      let filtered = allUsersData.data
      
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter((user:any) => {
          const username = user.authType === "local" ? user.username : user.discordUsername
          return username && username.toLowerCase().includes(searchTerm.toLowerCase())
        })
      }
      
      // Apply status filter if not "all"
      if (statusFilter !== "all") {
        filtered = filtered.filter((user: any) => 
          statusFilter === "active" ? user.role === "USER" : user.role === "ADMIN"
        )
      }
      
      setFilteredUsers(filtered)
    }
  }, [allUsersData, searchTerm, statusFilter])

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
  }

  if (wheelDataLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>
        {/* <Button className="bg-[#6c3cb9] hover:bg-[#5c2ca9]">Export Users</Button> */}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8 bg-[#1e1e38] border-[#3a3a5e] focus:border-[#4361ee] w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="flex gap-2">
          <div className="flex items-center gap-2 bg-[#1e1e38] border border-[#3a3a5e] rounded-md px-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-0 bg-transparent p-0 h-9 w-[120px] focus:ring-0">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="active">User</SelectItem>
                <SelectItem value="inactive">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" onClick={resetFilters}>Reset</Button>
        </div>
      </div>

      <div className="rounded-md border border-[#3a3a5e] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#252547]">
            <TableRow className="hover:bg-[#2a2a4e] border-[#3a3a5e]">
              <TableHead className="text-white">User</TableHead>
              <TableHead className="text-white">User type</TableHead>
              <TableHead className="text-white">Role</TableHead>
              {/* <TableHead className="text-white text-right">Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user:any) => (
                <TableRow key={user.id} className="hover:bg-[#2a2a4e] border-[#3a3a5e]">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.discordAvatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-[#4361ee]">
                          {(user.authType === "local" ? user.username : user.discordUsername || "").substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div>{user.authType === "local" ? user.username : user.discordUsername}</div>
                        <div className="text-xs text-muted-foreground">Created: {new Date(user.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={user.authType === "discord" ? "bg-indigo-900/20 text-indigo-400 border-indigo-800" : "bg-slate-800/50 text-slate-300 border-slate-700"}>
                      {user.authType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={user.role === "ADMIN" ? "bg-amber-900/20 text-amber-400 border-amber-800" : "bg-emerald-900/20 text-emerald-400 border-emerald-800"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  {/* <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No users found matching your search criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}