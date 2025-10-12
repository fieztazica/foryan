"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; left: string; delay: string; duration: string }>>([])

  useEffect(() => {
    const heartArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${8 + Math.random() * 4}s`,
    }))
    setHearts(heartArray)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute bottom-0 text-primary/20"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            animation: "floatHeart linear infinite",
          }}
          size={20 + Math.random() * 20}
          fill="currentColor"
        />
      ))}
    </div>
  )
}
