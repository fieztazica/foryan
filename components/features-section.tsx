"use client"

import { Card, CardContent } from "@/components/ui/card"
import NumberFlow from "@number-flow/react"
import { ArrowDown, Heart, Smile, Star, Zap } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const features = [
  {
    icon: Heart,
    title: "Your Smile",
    description: "It brightens even my darkest days and makes everything feel possible.",
  },
  {
    icon: Zap,
    title: "Your Energy",
    description: "The way you light up a room is absolutely captivating and infectious.",
  },
  {
    icon: Star,
    title: "Your Mind",
    description: "Every conversation with you is an adventure I never want to end.",
  },
  {
    icon: Smile,
    title: "Your Presence",
    description: "Just being around you makes everything better and more beautiful.",
  },
]

interface FeaturesSectionProps {
  isActive: boolean
  onNextSlide?: () => void
}

export function FeaturesSection({ isActive, onNextSlide }: FeaturesSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [value, setValue] = useState(2);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const searchParams = useSearchParams()
  const toWho = searchParams.get("to") || "you"
  const isYan = toWho === "Yan"

  useEffect(() => {
    if (isActive) {
      setIsVisible(true)
    }
  }, [isActive])

  useEffect(() => {
    if (!isYan) return;
    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev <= 1) return 2;
        if (prev >= 999) return 2;
        const chance = Math.random();
        let result = 0;
        if (chance < 0.2) {
            result = prev - Math.floor(Math.random() * 5) + 1;
        } else if (chance < 0.8) {
            result = prev + 1;
        } else {
            result = prev + Math.floor(Math.random() * 5) + 1;
        }
        if (result < 1) result = 2;
        return result;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 flex h-dvh w-full items-center overflow-hidden px-4 py-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <div
          className={`mb-8 md:mb-12 text-center transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="mb-3 md:mb-4 text-balance font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            What Makes You <span className="text-primary">Extraordinary</span>
          </h2>
          <p className="text-pretty text-base md:text-lg text-muted-foreground">
            {`Just a few of `} {isYan ? <NumberFlow value={value} /> : 'the countless'} {`reasons you're amazing`} {isYan && `(like the way you count stitches 😌)`}
          </p>

        </div>

        <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4 lg:px-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className={`group border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-1000 hover:scale-105 hover:border-primary/50 hover:shadow-xl ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{
                    transitionDelay: `${index * 150}ms`,
                    boxShadow: selectedCardIndex === index ? '0 10px 20px rgba(0, 0, 0, 0.2)' : undefined,
                    transform: selectedCardIndex === index ? 'scale(1.05)' : undefined
                }}
                onMouseEnter={() => setSelectedCardIndex(index)}
                onClick={() => setSelectedCardIndex(index)}
                onMouseLeave={() => setSelectedCardIndex(null)}
              >
                <CardContent className="p-4 md:p-6">
                  <div className="mb-3 md:mb-4 inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <h3 className="mb-2 text-lg md:text-xl font-semibold text-card-foreground">{feature.title}</h3>
                  <p className="text-pretty text-xs md:text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
      <ArrowDown className="absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2 text-foreground/50 animate-bounce text-primary drop-shadow cursor-pointer" strokeWidth={3} onClick={onNextSlide} />
    </section>
  )
}
