// "use client"

// import { useState, useRef, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { ChevronRight } from "lucide-react"
// import WheelSegment from "./wheel-segment"
// import SpinButton from "./spin-button"
// import PrizeOverlay from "./prize-overlay"

// // Update the prizes array to ensure names are short enough to fit
// const prizes = [
//   { id: 1, name: "50% Off", color: "from-blue-700 to-blue-900", textColor: "text-blue-300" },
//   { id: 2, name: "Free Session", color: "from-purple-700 to-purple-900", textColor: "text-purple-300" },
//   { id: 3, name: "Gift Card", color: "from-indigo-700 to-indigo-900", textColor: "text-indigo-300" },
//   { id: 4, name: "Premium", color: "from-violet-700 to-violet-900", textColor: "text-violet-300" },
//   { id: 5, name: "Mystery Box", color: "from-fuchsia-700 to-fuchsia-900", textColor: "text-fuchsia-300" },
//   { id: 6, name: "Extra Points", color: "from-blue-800 to-indigo-900", textColor: "text-blue-300" },
//   { id: 7, name: "VIP Status", color: "from-purple-800 to-indigo-900", textColor: "text-purple-300" },
//   { id: 8, name: "Special Badge", color: "from-indigo-800 to-violet-900", textColor: "text-indigo-300" },
// ]

// export default function FurysWheel() {
//   const [isSpinning, setIsSpinning] = useState(false)
//   const [rotation, setRotation] = useState(0)
//   const [winner, setWinner] = useState<(typeof prizes)[0] | null>(null)
//   const [showPrize, setShowPrize] = useState(false)
//   const audioRef = useRef<HTMLAudioElement | null>(null)
//   const spinSoundRef = useRef<HTMLAudioElement | null>(null)
//   const winSoundRef = useRef<HTMLAudioElement | null>(null)

//   useEffect(() => {
//     audioRef.current = new Audio("/sounds/click.mp3")
//     spinSoundRef.current = new Audio("/sounds/spin.mp3")
//     winSoundRef.current = new Audio("/sounds/win.mp3")

//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause()
//       }
//       if (spinSoundRef.current) {
//         spinSoundRef.current.pause()
//       }
//       if (winSoundRef.current) {
//         winSoundRef.current.pause()
//       }
//     }
//   }, [])

//   const handleSpin = () => {
//     if (isSpinning) return

//     // Play click sound
//     if (audioRef.current) {
//       audioRef.current.currentTime = 0
//       audioRef.current.play()
//     }

//     setIsSpinning(true)
//     setWinner(null)
//     setShowPrize(false)

//     // Play spin sound
//     if (spinSoundRef.current) {
//       spinSoundRef.current.currentTime = 0
//       spinSoundRef.current.play()
//     }

//     // First, decide which prize will be the winner
//     const winningIndex = Math.floor(Math.random() * prizes.length)
//     const winningPrize = prizes[winningIndex]

//     // Calculate the angle needed to land on this prize
//     // The pointer is at the top (0 degrees), so we need to calculate accordingly
//     const segmentAngle = 360 / prizes.length

//     // Calculate the target angle to land the winning segment at the top (pointer)
//     // We need to align the middle of the segment with the pointer
//     const targetAngle = 360 - winningIndex * segmentAngle - segmentAngle / 2

//     // Add full rotations (5-10) to make the spin more exciting
//     const fullRotations = 5 + Math.floor(Math.random() * 5)
//     const totalRotation = fullRotations * 360 + targetAngle

//     // Set the new rotation value
//     setRotation(rotation + totalRotation)

//     // Set timeout to show the prize after the wheel stops spinning
//     setTimeout(() => {
//       setIsSpinning(false)
//       setWinner(winningPrize)

//       // Play win sound
//       if (winSoundRef.current) {
//         winSoundRef.current.currentTime = 0
//         winSoundRef.current.play()
//       }

//       setTimeout(() => {
//         setShowPrize(true)
//       }, 500)
//     }, 5000) // Match this with the duration of the spin animation
//   }

//   return (
//     <div className="relative flex flex-col items-center">
//       <div className="relative w-72 h-72 md:w-96 md:h-96">
//         {/* Wheel container with metallic rim */}
//         <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 shadow-[0_0_15px_rgba(138,43,226,0.5)] p-2">
//           {/* Spinning wheel */}
//           <motion.div
//             className="w-full h-full rounded-full relative overflow-hidden"
//             animate={{ rotate: rotation }}
//             transition={{
//               duration: 5,
//               ease: [0.2, 0.5, 0.8, 0.98],
//             }}
//           >
//             {/* Wheel segments */}
//             {prizes.map((prize, index) => (
//               <WheelSegment key={prize.id} prize={prize} index={index} total={prizes.length} />
//             ))}
//           </motion.div>
//         </div>

//         {/* Center cap */}
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border-4 border-gray-700 shadow-lg z-10">
//           <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 opacity-80"></div>
//           <div className="absolute inset-2 rounded-full bg-gradient-to-r from-gray-900 to-black"></div>
//         </div>

//         {/* Pointer */}
//         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
//           <ChevronRight className="h-8 w-8 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] rotate-90" />
//         </div>
//       </div>

//       {/* Spin button */}
//       <div className="mt-12">
//         <SpinButton onClick={handleSpin} disabled={isSpinning} />
//       </div>

//       {/* Prize overlay */}
//       <AnimatePresence>
//         {showPrize && winner && <PrizeOverlay prize={winner} onClose={() => setShowPrize(false)} wheelName="Spin"/>}
//       </AnimatePresence>
//     </div>
//   )
// }


"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"
import WheelSegment from "./wheel-segment"
import SpinButton from "./spin-button"
import PrizeOverlay from "./prize-overlay"

type Prize = {
  id: number
  name: string
  color: string
  textColor: string
  wheelName: string
  probability: number // Adding probability as a percentage
}

const prizes = [
  { id: 1, name: "50% Off", color: "from-blue-700 to-blue-900", textColor: "text-blue-300", wheelName: "50% Off", probability: 15 },
  { id: 2, name: "Free Session", color: "from-purple-700 to-purple-900", textColor: "text-purple-300", wheelName: "Free Session", probability: 5 },
  { id: 3, name: "Gift Card", color: "from-indigo-700 to-indigo-900", textColor: "text-indigo-300", wheelName: "Gift Card", probability: 10 },
  { id: 4, name: "Premium", color: "from-violet-700 to-violet-900", textColor: "text-violet-300", wheelName: "Premium", probability: 5 },
  { id: 5, name: "Mystery Box", color: "from-fuchsia-700 to-fuchsia-900", textColor: "text-fuchsia-300", wheelName: "Mystery Box", probability: 20 },
  { id: 6, name: "Extra Points", color: "from-blue-800 to-indigo-900", textColor: "text-blue-300", wheelName: "Extra Points", probability: 25 },
  { id: 7, name: "VIP Status", color: "from-purple-800 to-indigo-900", textColor: "text-purple-300", wheelName: "VIP Status", probability: 5 },
  { id: 8, name: "Special Badge", color: "from-indigo-800 to-violet-900", textColor: "text-indigo-300", wheelName: "Special Badge", probability: 15 },
]

// Validate that probabilities sum to 100%
const validateProbabilities = () => {
  const sum = prizes.reduce((total, prize) => total + prize.probability, 0)
  if (Math.abs(sum - 100) > 0.01) {
    console.warn(`Prize probabilities sum to ${sum}%, not 100%. This may lead to unexpected behavior.`)
  }
}

// Create weighted segments based on probability
const createWeightedPrizeList = () => {
  validateProbabilities()
  
  // First, normalize probabilities to ensure they sum to 100%
  const totalProbability = prizes.reduce((sum, prize) => sum + prize.probability, 0)
  const normalizedPrizes = prizes.map(prize => ({
    ...prize,
    normalizedProbability: prize.probability / totalProbability
  }))
  
  // Create weighted prize map
  let cumulativeProbability = 0
  return normalizedPrizes.map(prize => {
    const segment = {
      prize,
      rangeStart: cumulativeProbability,
      rangeEnd: cumulativeProbability + prize.normalizedProbability
    }
    cumulativeProbability += prize.normalizedProbability
    return segment
  })
}

export default function FurysWheel() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [winner, setWinner] = useState<Prize | null>(null)
  const [showPrize, setShowPrize] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const spinSoundRef = useRef<HTMLAudioElement | null>(null)
  const winSoundRef = useRef<HTMLAudioElement | null>(null)
  
  // Generate weighted prize list on component mount
  const weightedPrizes = useRef(createWeightedPrizeList())

  useEffect(() => {
    audioRef.current = new Audio("/sounds/click.mp3")
    spinSoundRef.current = new Audio("/sounds/spin.mp3")
    winSoundRef.current = new Audio("/sounds/win.mp3")

    return () => {
      audioRef.current?.pause()
      spinSoundRef.current?.pause()
      winSoundRef.current?.pause()
    }
  }, [])

  // Select a prize based on weighted probability
  const selectPrizeByProbability = () => {
    const randomValue = Math.random() // Random value between 0 and 1
    const selectedSegment = weightedPrizes.current.find(
      segment => randomValue >= segment.rangeStart && randomValue < segment.rangeEnd
    )
    return selectedSegment?.prize || prizes[0] // Fallback to first prize if something goes wrong
  }
  
  // Calculate the angle to stop at for a specific prize
  const calculateTargetAngleForPrize = (selectedPrize: Prize) => {
    const prizeIndex = prizes.findIndex(prize => prize.id === selectedPrize.id)
    const segmentAngle = 360 / prizes.length
    
    // Calculate the center angle of the selected prize segment
    // Adding some randomness within the segment for natural-looking results
    const segmentCenter = prizeIndex * segmentAngle
    const randomOffset = (Math.random() * 0.6 + 0.2) * segmentAngle // Random position within 20%-80% of segment
    
    // We need to negate the angle because the wheel spins clockwise
    // The pointer is at the top (0 degrees in standard position)
    return (360 - (segmentCenter + randomOffset)) % 360
  }
  
  const determineWinningPrize = (finalRotation: number): Prize => {
    // Calculate which prize the pointer is pointing to based on the final rotation
    const segmentAngle = 360 / prizes.length
    
    // Normalize the rotation to 0-360 degrees
    const normalizedRotation = finalRotation % 360
    
    // Calculate which segment the pointer is pointing to
    // We subtract from 360 because the wheel rotates clockwise but our segments are numbered counterclockwise
    const segmentIndex = Math.floor((360 - normalizedRotation) / segmentAngle) % prizes.length
    
    return prizes[segmentIndex]
  }

  const handleSpin = () => {
    if (isSpinning || prizes.length === 0) return

    audioRef.current && ((audioRef.current.currentTime = 0), audioRef.current.play())

    setIsSpinning(true)
    setWinner(null)
    setShowPrize(false)

    spinSoundRef.current && ((spinSoundRef.current.currentTime = 0), spinSoundRef.current.play())

    // Select a prize based on probability
    const selectedPrize = selectPrizeByProbability()
    
    // Calculate the target angle for this prize
    const targetAngle = calculateTargetAngleForPrize(selectedPrize)
    
    // Add multiple full rotations for effect
    const fullRotations = 5 + Math.floor(Math.random() * 3)
    const totalRotation = fullRotations * 360 + targetAngle
    
    // Set the new rotation
    const finalRotation = rotation + totalRotation
    setRotation(finalRotation)

    setTimeout(() => {
      setIsSpinning(false)
      
      // Double-check which prize the pointer is actually pointing to
      const winningPrize = determineWinningPrize(finalRotation)
      setWinner(winningPrize)

      winSoundRef.current && ((winSoundRef.current.currentTime = 0), winSoundRef.current.play())

      setTimeout(() => {
        setShowPrize(true)
      }, 500)
    }, 5000)
  }

  // Visual segment size might be different from probability
  // For visual purposes, we'll keep equal segments visually
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-72 h-72 md:w-96 md:h-96">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 shadow-[0_0_15px_rgba(138,43,226,0.5)] p-2">
          <motion.div
            className="w-full h-full rounded-full relative overflow-hidden"
            animate={{ rotate: rotation }}
            transition={{ duration: 5, ease: [0.2, 0.5, 0.8, 0.98] }}
          >
            {prizes.map((prize, index) => (
              <WheelSegment 
                key={prize.id} 
                prize={prize} 
                index={index} 
                total={prizes.length} 
              />
            ))}
          </motion.div>
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border-4 border-gray-700 shadow-lg z-10">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 opacity-80"></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-gray-900 to-black"></div>
        </div>

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <ChevronRight className="h-8 w-8 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] rotate-90" />
        </div>
      </div>

      <div className="mt-12">
        <SpinButton onClick={handleSpin} disabled={isSpinning} />
      </div>

      <AnimatePresence>
        {showPrize && winner && (
          <PrizeOverlay
            prize={winner}
            onClose={() => setShowPrize(false)}
            wheelName={winner.wheelName}
          />
        )}
      </AnimatePresence>
    </div>
  )
}