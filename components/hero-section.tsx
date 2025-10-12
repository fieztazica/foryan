"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Heart, Pointer, Snowflake, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"

interface HeroSectionProps {
  isActive: boolean
  onNextSlide?: () => void
}

export function HeroSection({ isActive, onNextSlide }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const searchParams = useSearchParams()
  const toWho = searchParams.get("to") || "you"
  const isYan = toWho === "Yan"

  useEffect(() => {
    if (isActive) {
      setIsVisible(true)
    }
  }, [isActive])

  return (
    <section className="relative z-10 flex h-dvh w-full items-center justify-center overflow-hidden px-4 py-8 md:py-12">
      <div className="mx-auto max-w-4xl text-center flex flex-col items-center justify-center pb-16">
        <div
          className={`mb-4 md:mb-6 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary justify-center mx-auto">
            {toWho === "Yan" ? <>
                <Snowflake className="h-4 w-4" />
                <Image src="/river-svgrepo-com.svg" alt="river" width={16} height={16} className="h-4 w-4" />
            </> : <>
                <Sparkles className="h-4 w-4" />
                Precious Gem
            </>}
          </div>
        </div>

        <h1
          className={`mb-4 md:mb-6 text-balance font-serif text-4xl font-bold leading-tight text-foreground transition-all duration-1000 delay-200 md:text-6xl lg:text-7xl flex flex-col justify-center items-center rounded-lg py-16 w-full ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          } ${isYan ? "bg-cover bg-center bg-[url('/river-in-winter.png')] min-h-[calc(100dvh-400px)] md:min-h-[480px]" : ""} `}
        >
          <span className="drop-shadow drop-shadow/40">Every moment with you</span>
          <span className="text-primary drop-shadow-secondary/40 drop-shadow">feels like magic</span>
        </h1>

        <p
          className={`mb-6 md:mb-8 text-pretty text-base text-muted-foreground transition-all duration-1000 delay-500 md:text-lg lg:text-xl ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {`You light up my world in ways I never knew possible. Your smile, your laugh, the way you see the
          world—everything about you is extraordinary.`}
        </p>

        <div
          className={`flex flex-col items-center justify-center gap-4 transition-all duration-1000 delay-700 sm:flex-row ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
            <div className="relative">
                <Button
                    size="lg"
                    className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                    onClick={onNextSlide}
                >
                    <Heart className="mr-2 h-5 w-5 animate-heartbeat" fill="currentColor" />
                    <span>{"Discover Why You're Special"}</span>
                </Button>
                <div className="absolute -right-3 md:-right-5 -bottom-3 md:-bottom-5 animate-bounce">
                    <Pointer strokeWidth={3} className="h-8 md:h-10 w-8 md:w-10 scale-y-110 -rotate-45 text-primary drop-shadow drop-shadow-secondary" />
                </div>
            </div>

        </div>

        <div
          className={`mt-8 md:mt-12 animate-float transition-all duration-1000 delay-1000 hidden md:block absolute bottom-25 z-[-1] ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="mx-auto h-48 w-48 lg:h-56 lg:w-56 rounded-full bg-gradient-to-br from-primary/30 via-accent/30 to-primary/20 blur-3xl" />
        </div>
      </div>
    </section>
  )
}
