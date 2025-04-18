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
  probability: number
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

export default function FurysWheel({ forcedWinId }: { forcedWinId?: number }) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [winner, setWinner] = useState<Prize | null>(null)
  const [showPrize, setShowPrize] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const spinSoundRef = useRef<HTMLAudioElement | null>(null)
  const winSoundRef = useRef<HTMLAudioElement | null>(null)
  
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

  function validateProbabilities() {
    const sum = prizes.reduce((total, prize) => total + prize.probability, 0)
    if (Math.abs(sum - 100) > 0.01) {
      console.warn(`Prize probabilities sum to ${sum}%, not 100%. This may lead to unexpected behavior.`)
    }
  }

  function createWeightedPrizeList() {
    validateProbabilities()
    
    const totalProbability = prizes.reduce((sum, prize) => sum + prize.probability, 0)
    const normalizedPrizes = prizes.map(prize => ({
      ...prize,
      normalizedProbability: prize.probability / totalProbability
    }))
    
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

  const selectPrizeByProbability = () => {
    if (forcedWinId !== undefined) {
      const forcedPrize = prizes.find(prize => prize.id === forcedWinId)
      if (forcedPrize) {
        console.log(`Forcing wheel to land on: ${forcedPrize.wheelName}`)
        return forcedPrize
      }
      console.warn(`Forced win ID ${forcedWinId} not found in prizes list. Using random selection.`)
    }
    
    const randomValue = Math.random()
    const selectedSegment = weightedPrizes.current.find(
      segment => randomValue >= segment.rangeStart && randomValue < segment.rangeEnd
    )
    return selectedSegment?.prize || prizes[0]
  }
  
  const calculateTargetAngleForPrize = (selectedPrize: Prize) => {
    const prizeIndex = prizes.findIndex(prize => prize.id === selectedPrize.id)
    const segmentAngle = 360 / prizes.length

    const segmentCenterAngle = prizeIndex * segmentAngle + (segmentAngle / 2)
    

    const targetAngle = 360 - segmentCenterAngle + 90
    
    const randomOffset = forcedWinId !== undefined 
      ? 0 
      : (Math.random() * 0.4 - 0.2) * segmentAngle
    
    return targetAngle + randomOffset
  }

  const getPrizeAtCurrentRotation = (currentRotation: number) => {
    const normalizedRotation = currentRotation % 360
    const segmentAngle = 360 / prizes.length

    const pointerPosition = (360 - normalizedRotation + 90) % 360
    const prizeIndex = Math.floor(pointerPosition / segmentAngle)
    
    return prizes[prizeIndex % prizes.length]
  }
  
  const handleSpin = () => {
    if (isSpinning || prizes.length === 0) return

    audioRef.current && ((audioRef.current.currentTime = 0), audioRef.current.play())
    setIsSpinning(true)
    setWinner(null)
    setShowPrize(false)

    spinSoundRef.current && ((spinSoundRef.current.currentTime = 0), spinSoundRef.current.play())

    const selectedPrize = selectPrizeByProbability()
    const targetAngle = calculateTargetAngleForPrize(selectedPrize)
    
    const fullRotations = 5 + Math.floor(Math.random() * 3)
    const totalRotation = (fullRotations * 360) + targetAngle
    
    setRotation(prev => prev + totalRotation)

    setTimeout(() => {
      setIsSpinning(false)
      const finalRotation = (rotation + totalRotation) % 360
      const actualWinner = getPrizeAtCurrentRotation(finalRotation)
      
      setWinner(actualWinner)
      console.log(`Wheel stopped at: ${finalRotation}°`)
      console.log(`Winner: ${actualWinner.wheelName}`)

      winSoundRef.current && ((winSoundRef.current.currentTime = 0), winSoundRef.current.play())
      setTimeout(() => setShowPrize(true), 500)
    }, 5000)
  }

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