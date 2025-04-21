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
  const segmentAngle = 360 / total
  const rotation = index * segmentAngle
  const skewAngle = 90 - segmentAngle

  return (
    <div
      // className="absolute w-1/2 h-1/2 top-0 right-1/2 origin-bottom-right"
      className={`absolute w-1/2 h-1/2 top-0 right-1/2 origin-bottom-right bg-gradient-to-t ${prize.color}`}
      style={{
        transform: `rotate(${rotation}deg) skew(${skewAngle}deg)`,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        // backgroundColor: prize.color, // keep your color
      }}
    >
      {/* Divider line between segments */}
      <div className="absolute top-0 right-0 h-full w-[1px] bg-gray-800 opacity-50"></div>

      {/* Text container */}
      <div
        className="absolute w-full h-full flex items-center justify-center origin-bottom-right"
        style={{
          transform: `skew(-${skewAngle}deg) rotate(${-segmentAngle / 2}deg)`,
        }}
      >
        <span
          // className={`text-sm font-semibold ${prize.textColor}`} // uses your custom textColor like 'text-white', 'text-black', etc.
          className={`text-sm font-semibold text-white`}
          style={{
            transform: `rotate(${segmentAngle / 2}deg)`,
            whiteSpace: 'nowrap',
          }}
        >
          {prize.name}
        </span>
      </div>
    </div>
  )
}
