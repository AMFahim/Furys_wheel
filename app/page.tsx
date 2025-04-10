import FurysWheel from "@/components/furys-wheel"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-indigo-950 to-black">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 mb-2">
          Fury&apos;s Wheel
        </h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Spin the wheel and test your luck. What prize awaits you today?
        </p>
      </div>

      <FurysWheel />

      <footer className="mt-16 text-gray-500 text-sm">
        <p>No login required. Spin and win instantly.</p>
      </footer>
    </main>
  )
}
