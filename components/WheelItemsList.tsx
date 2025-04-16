"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

interface Wheel {
  id: string
  name: string
  prizes: number
  theme: string
}

interface GlassWheelListProps {
  wheels: Wheel[]
  selectedWheel: string | null
  onSelectWheel: (id: string) => void
}

export default function GlassWheelList({ wheels, selectedWheel, onSelectWheel }: GlassWheelListProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      {/* Collapse/Expand Button */}
      <motion.button
        className="fixed top-1/2 left-[280px] z-30 -translate-y-1/2 bg-purple-600/80 hover:bg-purple-700/80 backdrop-blur-sm text-white rounded-r-full p-2 shadow-lg"
        animate={{ left: isCollapsed ? "16px" : "280px" }}
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Expand wheel list" : "Collapse wheel list"}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </motion.button>

      {/* Glass Effect Sidebar */}
      <motion.div
        className="h-screen sticky top-0 overflow-hidden z-20"
        initial={{ width: 300 }}
        animate={{ width: isCollapsed ? 0 : 300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="w-[300px] h-full relative">
          {/* Glass Effect Background */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-md border-r border-white/10 shadow-[0_0_15px_rgba(130,100,255,0.15)]"></div>

          {/* Animated Gradient Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-600/30 to-blue-600/30 animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-radial from-purple-500/20 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-full h-40 bg-gradient-radial from-blue-500/20 to-transparent"></div>
          </div>

          {/* Content Container */}
          <div className="relative h-full flex flex-col p-6 text-white">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="text-purple-400" size={20} />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                 Available Wheels
                </span>
              </h2>
              <p className="text-sm text-gray-400 mt-1">Wheel of Luck</p>
            </div>

            {/* Wheel List */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence>
                {wheels.map((wheel) => (
                  <motion.div
                    key={wheel.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`
                      mb-3 p-4 rounded-xl cursor-pointer transition-all duration-300
                      ${
                        selectedWheel === wheel.id
                          ? "bg-gradient-to-r from-purple-600/40 to-blue-600/40 border border-white/20 shadow-glow"
                          : "bg-white/5 hover:bg-white/10 border border-white/5"
                      }
                    `}
                    onClick={() => onSelectWheel(wheel.id)}
                  >
                    <div className="flex items-center gap-3">
                      {/* Wheel Icon/Indicator */}
                      <div
                        className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        bg-gradient-to-br ${getThemeGradient(wheel.theme)}
                      `}
                      >
                        <div className="w-6 h-6 rounded-full bg-black/30 flex items-center justify-center text-xs font-bold">
                          {wheel.prizes}
                        </div>
                      </div>

                      {/* Wheel Info */}
                      <div>
                        <h3 className="font-medium">{wheel.name}</h3>
                        {/* <p className="text-xs text-gray-400">{wheel.prizes} prizes available</p> */}
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {selectedWheel === wheel.id && (
                      <motion.div
                        className="h-1 w-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-3"
                        layoutId="activeIndicator"
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-400">Total Prizes: {wheels.length}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

// Helper function to get gradient classes based on theme
function getThemeGradient(theme: string): string {
  switch (theme) {
    case "gold":
      return "from-yellow-500 to-amber-600"
    case "purple":
      return "from-purple-500 to-violet-600"
    case "red":
      return "from-red-500 to-rose-600"
    case "blue":
      return "from-blue-500 to-indigo-600"
    case "green":
      return "from-green-500 to-emerald-600"
    case "platinum":
      return "from-gray-300 to-gray-500"
    case "orange":
      return "from-orange-500 to-amber-600"
    case "rainbow":
      return "from-purple-500 via-pink-500 to-red-500"
    default:
      return "from-purple-500 to-blue-600"
  }
}
