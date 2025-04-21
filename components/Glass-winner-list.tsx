"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Trophy, Clock } from "lucide-react"

interface Winner {
  id: number
  name: string
  prize: string
  wheel: string
  timestamp: string
  user: any;
  wheelName: string;
  wheelReward: string;
}

interface GlassWinnersListProps {
  winners: Winner[]
}

export default function GlassWinnersList({ winners }: GlassWinnersListProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const maskUsername = (username:string) => {
    if (!username || username.length <= 2) return username;
    const first = username[0];
    const last = username[username.length - 1];
    const middle = '*'.repeat(username.length - 2);
    return `${first}${middle}${last}`;
  };

  return (
    <>
      {/* Collapse/Expand Button */}
      <motion.button
        className="fixed top-1/2 right-[280px] z-30 -translate-y-1/2 bg-purple-600/80 hover:bg-purple-700/80 backdrop-blur-sm text-white rounded-l-full p-2 shadow-lg"
        animate={{ right: isCollapsed ? "16px" : "280px" }}
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Expand winners list" : "Collapse winners list"}
      >
        {isCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
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
          <div className="absolute inset-0 bg-white/5 backdrop-blur-md border-l border-white/10 shadow-[0_0_15px_rgba(130,100,255,0.15)]"></div>

          {/* Animated Gradient Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/30 to-purple-600/30 animate-pulse"></div>
            <div className="absolute top-0 right-0 w-full h-40 bg-gradient-radial from-blue-500/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-radial from-purple-500/20 to-transparent"></div>
          </div>

          {/* Content Container */}
          <div className="relative h-full flex flex-col p-6 text-white">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Trophy className="text-yellow-400" size={20} />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-400">
                  Recent Winners
                </span>
              </h2>
              <p className="text-sm text-gray-400 mt-1">Latest lucky players</p>
            </div>

            {/* Winners List */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence>
                {winners?.map((winner, index) => (
                  <motion.div
                    key={winner.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="mb-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      {/* Winner Position */}
                      <div className="min-w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500/30 to-amber-600/30 flex items-center justify-center text-yellow-400 font-bold text-sm">
                        #{index + 1}
                      </div>

                      {/* Winner Info */}
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{maskUsername(winner.user.username)}</h3>
                        <div className="flex flex-col w-full gap-1 mt-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                            {winner.wheelReward}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                            {winner.wheelName}
                          </span>
                        </div>
                        {/* <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                          <Clock size={12} />
                          <span>{winner.timestamp}</span>
                        </div> */}
                      </div>
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 -translate-x-full hover:translate-x-full"></div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {/* <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-400">Total winners: {winners.length}</p>
                <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors">View All</button>
              </div>
            </div> */}
          </div>
        </div>
      </motion.div>
    </>
  )
}
