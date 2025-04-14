export function Overview() {
    return (
      <div className="h-[200px] flex items-end gap-2">
        {[40, 25, 60, 30, 45, 80, 55].map((height, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-[#4361ee] rounded-sm" style={{ height: `${height}%` }}></div>
            <span className="text-xs text-muted-foreground">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}</span>
          </div>
        ))}
      </div>
    )
  }
  