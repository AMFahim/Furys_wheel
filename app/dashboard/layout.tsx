import type React from "react"

import "@/app/globals.css"
import { Sidebar } from "@/components/admin/sidebar"
import { Header } from "@/components/admin/header"

export const metadata = {
  title: "Wheel Game Admin Panel",
  description: "Admin panel for managing wheel game",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
