"use client"

import { motion } from "framer-motion"

type SpinButtonProps = {
  onClick: () => void
  disabled: boolean
}

export default function SpinButton({ onClick, disabled }: SpinButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative px-8 py-3 rounded-full font-bold text-lg
        bg-gradient-to-r from-purple-700 to-indigo-800
        shadow-[0_0_15px_rgba(138,43,226,0.5)]
        disabled:opacity-70 disabled:cursor-not-allowed
        overflow-hidden
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>

      {/* Button text with metallic effect */}
      <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-indigo-200 to-purple-200">
        {disabled ? "Spinning..." : "SPIN"}
      </span>

      {/* Animated border */}
      <span className="absolute inset-0 border border-purple-500/50 rounded-full"></span>

      {/* Spinning animation for when the button is disabled */}
      {disabled && (
        <motion.span
          className="absolute inset-0 border-2 border-transparent border-t-purple-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        ></motion.span>
      )}
    </motion.button>
  )
}
