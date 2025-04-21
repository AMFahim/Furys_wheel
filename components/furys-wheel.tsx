"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"
import WheelSegment from "./wheel-segment"
import SpinButton from "./spin-button"
import PrizeOverlay from "./prize-overlay"
import { useUser } from "@/providers/UserContext"

type Prize = {
  id: number
  name: string
  color: string
  textColor: string
  wheelName: string
  percentage: number
}

export default function FurysWheel({ forcedWinId }: { forcedWinId?: number }) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [winner, setWinner] = useState<Prize | null>(null)
  const [showPrize, setShowPrize] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const spinSoundRef = useRef<HTMLAudioElement | null>(null)
  const winSoundRef = useRef<HTMLAudioElement | null>(null)
  const { user, approvedWheelData, setFetchApprovedWheelData } = useUser()
  const [prizes, setPrizes] = useState<Prize[]>([])
  const weightedPrizes = useRef<any[]>([])

  // Initialize audio and fetch wheel data
  useEffect(() => {
    audioRef.current = new Audio("/sounds/click.mp3")
    spinSoundRef.current = new Audio("/sounds/spin.mp3")
    winSoundRef.current = new Audio("/sounds/win.mp3")

    setFetchApprovedWheelData(true)
    
    return () => {
      audioRef.current?.pause()
      spinSoundRef.current?.pause()
      winSoundRef.current?.pause()
    }
  }, [setFetchApprovedWheelData])

  // Update prizes when wheel data is available
  useEffect(() => {
    if (approvedWheelData && approvedWheelData[0]?.wheelOption && approvedWheelData[0].wheelOption.length > 0) {
      console.log("Setting prizes with:", approvedWheelData[0].wheelOption)
      setPrizes(approvedWheelData[0].wheelOption)
    }
  }, [approvedWheelData])

  // Update weightedPrizes when prizes change
  useEffect(() => {
    if (prizes && prizes.length > 0) {
      console.log("Updating weighted prizes with:", prizes)
      weightedPrizes.current = createWeightedPrizeList(prizes)
    }
  }, [prizes])

  function validateProbabilities(prizesData: Prize[]) {
    if (!prizesData || prizesData.length === 0) return
    
    const sum = prizesData.reduce((total, prize) => total + prize.percentage, 0)
    if (Math.abs(sum - 100) > 0.01) {
      console.warn(`Prize probabilities sum to ${sum}%, not 100%. This may lead to unexpected behavior.`)
    }
  }

  function createWeightedPrizeList(prizesData: Prize[]) {
    if (!prizesData || prizesData.length === 0) return []
    
    validateProbabilities(prizesData)
    
    const totalPercentage = prizesData.reduce((sum, prize) => sum + prize.percentage, 0)
    const normalizedPrizes = prizesData.map((prize) => ({
      ...prize,
      normalizedPercentage: prize.percentage / totalPercentage
    }))
    
    let cumulativePercentage = 0
    return normalizedPrizes.map((prize) => {
      const segment = {
        prize,
        rangeStart: cumulativePercentage,
        rangeEnd: cumulativePercentage + prize.normalizedPercentage
      }
      cumulativePercentage += prize.normalizedPercentage
      return segment
    })
  }

  const selectPrizeByPercentage = () => {
    if (!prizes || prizes.length === 0 || !weightedPrizes.current || weightedPrizes.current.length === 0) {
      console.error("Cannot select prize - prizes or weightedPrizes not initialized")
      return prizes?.[0]
    }
    
    if (forcedWinId !== undefined) {
      const forcedPrize = prizes.find((prize) => prize.id === forcedWinId)
      if (forcedPrize) {
        console.log(`Forcing wheel to land on: ${forcedPrize.wheelName}`)
        return forcedPrize
      }
      console.warn(`Forced win ID ${forcedWinId} not found in prizes list. Using random selection.`)
    }
    
    const randomValue = Math.random()
    const selectedSegment = weightedPrizes.current.find(
      (segment) => randomValue >= segment.rangeStart && randomValue < segment.rangeEnd
    )
    return selectedSegment?.prize || prizes[0]
  }
  
  const calculateTargetAngleForPrize = (selectedPrize: Prize) => {
    if (!prizes || prizes.length === 0) {
      console.error("Cannot calculate angle - prizes not initialized")
      return 0
    }
    
    const prizeIndex = prizes.findIndex((prize) => prize.id === selectedPrize.id)
    if (prizeIndex === -1) {
      console.error("Selected prize not found in prizes array")
      return 0
    }
    
    const segmentAngle = 360 / prizes.length
    const segmentCenterAngle = prizeIndex * segmentAngle + (segmentAngle / 2)
    const targetAngle = 360 - segmentCenterAngle + 90
    
    const randomOffset = forcedWinId !== undefined 
      ? 0 
      : (Math.random() * 0.4 - 0.2) * segmentAngle
    
    return targetAngle + randomOffset
  }

  const getPrizeAtCurrentRotation = (currentRotation: number) => {
    if (!prizes || prizes.length === 0) {
      console.error("Cannot get prize at rotation - prizes not initialized")
      return null
    }
    
    const normalizedRotation = currentRotation % 360
    const segmentAngle = 360 / prizes.length
    const pointerPosition = (360 - normalizedRotation + 90) % 360
    const prizeIndex = Math.floor(pointerPosition / segmentAngle)
    
    return prizes[prizeIndex % prizes.length]
  }
  
  const handleSpin = () => {
    if (!user?.role || (user.role !== "ADMIN" && user.role !== "USER")) {
      window.location.href = "/login"
      return
    }
    
    if (isSpinning) return
    
    if (!prizes || prizes.length === 0 || !weightedPrizes.current || weightedPrizes.current.length === 0) {
      console.error("Cannot spin - prizes or weightedPrizes not initialized")
      return
    }

    audioRef.current && ((audioRef.current.currentTime = 0), audioRef.current.play())
    setIsSpinning(true)
    setWinner(null)
    setShowPrize(false)

    spinSoundRef.current && ((spinSoundRef.current.currentTime = 0), spinSoundRef.current.play())

    const selectedPrize = selectPrizeByPercentage()
    if (!selectedPrize) {
      console.error("Failed to select a prize")
      setIsSpinning(false)
      return
    }
    
    const targetAngle = calculateTargetAngleForPrize(selectedPrize)
    const fullRotations = 5 + Math.floor(Math.random() * 3)
    const totalRotation = (fullRotations * 360) + targetAngle
    
    // Store the current rotation + new rotation amount to calculate winner later
    const newRotation = rotation + totalRotation
    setRotation(newRotation)

    setTimeout(() => {
      setIsSpinning(false)
      const finalRotation = newRotation % 360
      const actualWinner = getPrizeAtCurrentRotation(finalRotation)
      
      if (actualWinner) {
        setWinner(actualWinner)
        winSoundRef.current && ((winSoundRef.current.currentTime = 0), winSoundRef.current.play())
        setTimeout(() => setShowPrize(true), 500)
      } else {
        console.error("Failed to determine a winner")
      }
    }, 5000)
  }


  console.log("wheel winner", winner);
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-72 h-72 md:w-96 md:h-96">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 shadow-[0_0_15px_rgba(138,43,226,0.5)] p-2">
          <motion.div
            className="w-full h-full rounded-full relative overflow-hidden"
            animate={{ rotate: rotation }}
            transition={{ duration: 5, ease: [0.2, 0.5, 0.8, 0.98] }}
          >
            {prizes?.map((prize, index) => (
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
            wheelName={approvedWheelData?.[0]?.name}
          />
        )}
      </AnimatePresence>
    </div>
  )
}