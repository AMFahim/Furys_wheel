import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AppProvider from "@/providers/AppProvider"
import { Toaster } from "sonner"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fury's Wheel - Spin & Win",
  description: "Spin the wheel and test your luck with Fury's Wheel of prizes",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
        {children}
        </AppProvider>
        <Toaster/>
        </body>
    </html>
  )
}


