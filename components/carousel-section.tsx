"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface CarouselSectionProps {
  isActive: boolean
  setIsDisplayedSlideNavigation?: (display: boolean) => void
}

const images = [
      {
        "url": "/Yan/IMG_0016.png",
        "caption": "Image IMG_0016"
      },
      {
        "url": "/Yan/IMG_0021.jpg",
        "caption": "Image IMG_0021"
      },
      {
        "url": "/Yan/IMG_0022.jpg",
        "caption": "Image IMG_0022"
      },
      {
        "url": "/Yan/IMG_0023.png",
        "caption": "Image IMG_0023"
      },
      {
        "url": "/Yan/IMG_0038.png",
        "caption": "Image IMG_0038"
      },
      {
        "url": "/Yan/IMG_0129.jpg",
        "caption": "Image IMG_0129"
      },
      {
        "url": "/Yan/IMG_0203.png",
        "caption": "Image IMG_0203"
      },
      {
        "url": "/Yan/IMG_0218.png",
        "caption": "Image IMG_0218"
      },
      {
        "url": "/Yan/IMG_0226.png",
        "caption": "Image IMG_0226"
      },
      {
        "url": "/Yan/IMG_0230.png",
        "caption": "Image IMG_0230"
      },
      {
        "url": "/Yan/IMG_0264.png",
        "caption": "Image IMG_0264"
      },
      {
        "url": "/Yan/IMG_20250830_174909_Original.jpg",
        "caption": "Image IMG_20250830_174909"
      },
      {
        "url": "/Yan/IMG_20250830_200956_Original.jpg",
        "caption": "Image IMG_20250830_200956"
      }
]

export function CarouselSection({ isActive, setIsDisplayedSlideNavigation }: CarouselSectionProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fullscreenImage, setFullscreenImage] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!isActive || !isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isActive, isAutoPlaying])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        closeFullscreen()
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isFullscreen])

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden"
      setIsDisplayedSlideNavigation && setIsDisplayedSlideNavigation(false)
    } else {
      document.body.style.overflow = ""
      setIsDisplayedSlideNavigation && setIsDisplayedSlideNavigation(true)
    }
    return () => {
      document.body.style.overflow = ""
      setIsDisplayedSlideNavigation && setIsDisplayedSlideNavigation(true)
    }
  }, [isFullscreen])

  useEffect(() => {
    if (isFullscreen) {
      setIsAnimating(true)
    }
  }, [isFullscreen])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const goToImage = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentImage(index)
  }

  const openFullscreen = (index: number) => {
    console.log("[v0] Opening fullscreen with index:", index)
    setFullscreenImage(index)
    setIsFullscreen(true)
  }

  const closeFullscreen = () => {
    setIsAnimating(false)
    setTimeout(() => {
      setIsFullscreen(false)
    }, 300) // Wait for animation to complete
  }

  const goToNextFullscreen = () => {
    setFullscreenImage((prev) => (prev + 1) % images.length)
  }

  const goToPreviousFullscreen = () => {
    setFullscreenImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <section className="relative h-dvh w-full overflow-hidden flex items-center justify-center px-4 md:px-12">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5" />

        <div className="relative z-10 w-full max-w-5xl mx-auto">
          {/* Title */}
          <h2
            className={`text-3xl md:text-5xl font-serif font-bold text-center mb-6 md:mb-8 text-balance transition-all duration-1000 ${
              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Our Special Moments
          </h2>

          {/* Carousel container */}
          <div
            className={`relative transition-all duration-1000 delay-200 ${
              isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {/* Image container */}
            <div className="relative aspect-[4/3] md:aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                  style={{
                    opacity: index === currentImage ? 1 : 0,
                    pointerEvents: index === currentImage ? "auto" : "none",
                  }}
                >
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.caption}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => {
                      console.log("[v0] Image clicked, index:", index, "currentImage:", currentImage)
                      openFullscreen(currentImage)
                    }}
                    fill
                    quality={75}
                  />
                  {/* Caption overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6 pointer-events-none">
                    <p className="text-white text-lg md:text-2xl font-serif text-center text-balance">
                      {image.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full h-10 w-10 md:h-12 md:w-12 shadow-lg"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full h-10 w-10 md:h-12 md:w-12 shadow-lg"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </Button>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-4 md:mt-6">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentImage ? "w-8 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/50"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {isFullscreen && (
        <div
          className={`absolute inset-0 z-50 bg-black/95 flex items-center justify-center transition-opacity duration-300 ${
            isAnimating ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeFullscreen}
        >
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={closeFullscreen}
            className={`absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full h-12 w-12 z-10 transition-all duration-300 ${
              isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              goToPreviousFullscreen()
            }}
            className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full h-12 w-12 md:h-14 md:w-14 z-10 transition-all duration-300 delay-100 shadow ${
              isAnimating ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
          >
            <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" strokeWidth={3} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              goToNextFullscreen()
            }}
            className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full h-12 w-12 md:h-14 md:w-14 z-10 transition-all duration-300 delay-100 shadow ${
              isAnimating ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <ChevronRight className="h-6 w-6 md:h-8 md:w-8" strokeWidth={3} />
          </Button>

          {/* Fullscreen carousel container */}
          <div
            className={`relative w-full h-full flex items-center justify-center transition-all duration-500 ${
              isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out px-4 ${
                    index === fullscreenImage ? "opacity-100" : "opacity-0"
                  }`}
                >
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.caption}
                      className="object-contain max-w-[90vw] max-h-[70vh] shadow-2xl rounded-lg"
                    />
                  <p className="text-white text-xl md:text-3xl font-serif text-center mt-6 text-balance px-4">
                    {image.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 text-sm md:text-base transition-all duration-300 delay-200 ${
              isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {fullscreenImage + 1} / {images.length}
          </div>
        </div>
      )}
      </section>
    </>
  )
}
