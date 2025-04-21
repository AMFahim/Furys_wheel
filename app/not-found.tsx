import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0e1a] text-white p-4">
      <div className="max-w-3xl w-full mx-auto text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 blur-xl opacity-30 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          <h1 className="text-6xl md:text-8xl font-bold relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400">
            404
          </h1>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-300">Page Not Found</h2>

        <div className="relative w-48 h-48 mx-auto my-8">
          <div className="absolute inset-0 rounded-full border-4 border-gray-700 animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-t-4 border-purple-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-purple-400" />
          </div>
        </div>

        <p className="text-xl mb-8 text-gray-300 max-w-lg mx-auto">
          The prize wheel you're looking for has spun away. Let's get you back to the game.
        </p>

        <div className="flex justify-center">
          <Link
            href="/"
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-purple-900/30"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Main Wheel</span>
          </Link>
        </div>
      </div>

     
    </div>
  )
}
