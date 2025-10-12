"use client"

import { CarouselSection } from "@/components/carousel-section"
import { FeaturesSection } from "@/components/features-section"
import { FloatingHearts } from "@/components/floating-hearts"
import { HeroSection } from "@/components/hero-section"
import { MessageSection } from "@/components/message-section"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isScrolling, setIsScrolling] = useState(false)
    const searchParams = useSearchParams()
    const [isDisplayedSlideNavigation, setIsDisplayedSlideNavigation] = useState<boolean>(true)
    const toWho = searchParams.get("to") || "you"
    const isYan = toWho === "Yan"
    const totalSlides = isYan ? 4 : 3

  const goToNextSlide = () => {
    if (!isScrolling && currentSlide < totalSlides - 1) {
      setIsScrolling(true)
      setCurrentSlide((prev) => prev + 1)
      setTimeout(() => setIsScrolling(false), 1000)
    }
  }

  useEffect(() => {
    let touchStartY = 0
    let touchEndY = 0

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return
      e.preventDefault()

      if (e.deltaY > 0 && currentSlide < totalSlides - 1) {
        // Scroll down
        setIsScrolling(true)
        setCurrentSlide((prev) => prev + 1)
        setTimeout(() => setIsScrolling(false), 1000)
      } else if (e.deltaY < 0 && currentSlide > 0) {
        // Scroll up
        setIsScrolling(true)
        setCurrentSlide((prev) => prev - 1)
        setTimeout(() => setIsScrolling(false), 1000)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return
      touchEndY = e.changedTouches[0].clientY
      const diff = touchStartY - touchEndY

      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentSlide < totalSlides - 1) {
          // Swipe up
          setIsScrolling(true)
          setCurrentSlide((prev) => prev + 1)
          setTimeout(() => setIsScrolling(false), 1000)
        } else if (diff < 0 && currentSlide > 0) {
          // Swipe down
          setIsScrolling(true)
          setCurrentSlide((prev) => prev - 1)
          setTimeout(() => setIsScrolling(false), 1000)
        }
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return

      if ((e.key === "ArrowDown" || e.key === "PageDown") && currentSlide < totalSlides - 1) {
        setIsScrolling(true)
        setCurrentSlide((prev) => prev + 1)
        setTimeout(() => setIsScrolling(false), 1000)
      } else if ((e.key === "ArrowUp" || e.key === "PageUp") && currentSlide > 0) {
        setIsScrolling(true)
        setCurrentSlide((prev) => prev - 1)
        setTimeout(() => setIsScrolling(false), 1000)
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentSlide, isScrolling])

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-accent/20">
      <FloatingHearts />

      {/* Slide navigation dots */}
      <div className={cn("fixed translate-x-1/2 md:translate-x-0 right-1/2 md:right-4 top-4 md:top-1/2 z-50 flex translate-y-0 md:-translate-y-1/2 flex-row md:flex-col gap-3", isDisplayedSlideNavigation ? "opacity-100" : "opacity-0 pointer-events-none")}>
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isScrolling) {
                setIsScrolling(true)
                setCurrentSlide(index)
                setTimeout(() => setIsScrolling(false), 1000)
              }
            }}
            className={`h-3 w-3 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === index ? "bg-primary scale-125" : "bg-primary/30 hover:bg-primary/50"
            }`}
            title={`Go to slide ${index + 1}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slides container */}
      <div
        className="relative h-full w-full transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateY(-${currentSlide * 100}%)`,
        }}
      >
        <HeroSection isActive={currentSlide === 0} onNextSlide={goToNextSlide} />
        <FeaturesSection isActive={currentSlide === 1} onNextSlide={goToNextSlide} />
        <MessageSection isActive={currentSlide === 2} onNextSlide={goToNextSlide} />
        {isYan && <CarouselSection isActive={currentSlide === 3} setIsDisplayedSlideNavigation={setIsDisplayedSlideNavigation} />}
      </div>
    </main>
  )
}
