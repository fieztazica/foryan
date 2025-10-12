"use client"

import { useEffect, useState, type RefObject } from "react"

export function useScrollAnimation(ref: RefObject<HTMLElement>) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const element = ref.current
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Check if element is in view
      const inView = rect.top < windowHeight && rect.bottom > 0
      setIsInView(inView)

      // Calculate scroll progress (0 to 1)
      const elementTop = rect.top
      const elementHeight = rect.height
      const progress = Math.max(0, Math.min(1, 1 - (elementTop - windowHeight * 0.2) / (windowHeight * 0.6)))

      setScrollProgress(progress)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [ref])

  return { scrollProgress, isInView }
}
