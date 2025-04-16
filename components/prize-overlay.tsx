"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"

type Prize = {
  id: number
  name: string
  color: string
  textColor: string
}

type PrizeOverlayProps = {
  prize: Prize
  onClose: () => void
  wheelName?: string // 👈 Add this line

}

export default function PrizeOverlay({ prize, onClose, wheelName }: PrizeOverlayProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-80 max-w-md bg-gradient-to-b from-gray-900 to-black rounded-xl border border-purple-900/50 shadow-[0_0_30px_rgba(138,43,226,0.3)] p-6"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 15 }}
      >
        {/* Close button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
          <X size={20} />
        </button>

        {/* Prize content */}
        <div className="text-center">
          <motion.div
            className="mb-4 mx-auto w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-900/50 to-indigo-900/50"
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", damping: 10, delay: 0.2 }}
          >
            <motion.div
              className="text-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              🎁
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Congratulations!
          </motion.h2>

          <motion.div
            className="mb-4"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-gray-400 mb-2">You&apos;ve won:</p>
            <p className={`text-xl font-bold ${prize.textColor}`}>{wheelName}</p>
            {/* <p className={`text-xl font-bold ${prize.textColor}`}>{prize.name}</p> */}

          </motion.div>

          {/* Animated confetti effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: `hsl(${260 + Math.random() * 60}, 70%, 60%)`,
                }}
                initial={{
                  y: -20,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  y: 100 + Math.random() * 100,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5],
                }}
                transition={{
                  duration: 1.5 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          {/* Claim button */}
          <motion.button
            className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium shadow-lg hover:shadow-purple-500/20 transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Claim Your Prize
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
