"use client"

type Prize = {
  id: number
  name: string
  color: string
  textColor: string
}

type WheelSegmentProps = {
  prize: Prize
  index: number
  total: number
}

export default function WheelSegment({ prize, index, total }: WheelSegmentProps) {
  // Calculate the angle for each segment
  const segmentAngle = 360 / total
  const rotation = index * segmentAngle

  // Calculate the skew angle to create the pie segments
  const skewAngle = 90 - segmentAngle

  return (
    <div
      className={`absolute w-1/2 h-1/2 top-0 right-1/2 origin-bottom-right bg-gradient-to-t ${prize.color}`}
      style={{
        transform: `rotate(${rotation}deg) skew(${skewAngle}deg)`,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      }}
    >
      {/* Text label */}
      <div
        className={`absolute top-2/4 left-2/4 transform -translate-x-2/2 -translate-y-2/2 rotate-[30deg] ${prize.textColor} font-medium text-xs md:text-sm whitespace-nowrap`}
        style={{
          transform: `rotate(${-rotation - skewAngle / 2}deg) translateY(-100%)`,
          transformOrigin: "bottom center",
        }}
      >
        {prize.name}
      </div>

      {/* Subtle divider line */}
      <div className="absolute top-0 right-0 h-full w-[1px] bg-gray-800 opacity-50"></div>

      {/* Metallic accent */}
      <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"></div>
    </div>
  )
}
