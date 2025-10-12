"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowDown, Heart } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface MessageSectionProps {
  isActive: boolean
  onNextSlide?: () => void
}

const staticMemes = [
    "/memes/static/rose.jpg",
    "/memes/static/sun.jpg",
    "/memes/static/tulip.jpg",
    "/memes/static/hearts.jpg",
    "/memes/static/white.jpg",
]

const gifMemes = [
    "/memes/gif/cat-scottish-fold.gif",
    "/memes/gif/gavin-rose.gif",
    "/memes/gif/smoke-flower.gif",
    "/memes/gif/this-is-for-you-cat-flower.gif",
    "/memes/gif/cat-cat-love.gif",
    "/memes/gif/shironeko-cat-holding-a-flower-shironeko.gif",
    "/memes/gif/cat-confused-look.gif",
    "/memes/gif/j4u.gif",
]

export function MessageSection({ isActive, onNextSlide }: MessageSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [staticMeme, setStaticMeme] = useState<string>(staticMemes[0])
  const [yanMeme, setYanMeme] = useState<string>(gifMemes[0])
  const searchParams = useSearchParams()
  const toWho = searchParams.get("to") || "you"
  const isYan = toWho === "Yan"

  const getRandomStaticMeme = () => setStaticMeme(staticMemes[Math.floor(Math.random() * staticMemes.length)])
  const getRandomYanMeme = () => setYanMeme([...staticMemes, ...gifMemes][Math.floor(Math.random() * [...staticMemes, ...gifMemes].length)])
  const getRandomMeme = () => {
    if (isYan) {
        getRandomYanMeme()
    } else {
        getRandomStaticMeme()
    }
  }

  useEffect(() => {
    if (isActive) {
      setIsVisible(true)
    }
  }, [isActive])

  return (
    <Dialog>
    <section className="relative z-10 flex h-dvh w-full items-center overflow-hidden px-4 py-8 md:py-12">
      <div className="mx-auto w-full max-w-3xl">
        <div
          className={`rounded-3xl border border-border/50 bg-card/80 p-6 md:p-8 lg:p-12 text-center backdrop-blur-sm transition-all duration-1000 ${
            isVisible ? "scale-100 opacity-100 rotate-0" : "scale-90 opacity-0 -rotate-3"
          }`}
        >
          <div className="mb-4 md:mb-6 inline-flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary/10">
            <Heart className="h-6 w-6 md:h-8 md:w-8 animate-heartbeat text-primary" fill="currentColor" />
          </div>

          <h2 className="mb-3 md:mb-4 text-balance font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-card-foreground">
            {"You deserve to know how special you are"}
          </h2>

          <p className="mb-6 md:mb-8 text-pretty text-base md:text-lg leading-relaxed text-muted-foreground">
            {`In a world full of ordinary moments, you make everything extraordinary. Your kindness, your spirit, your
            unique way of seeing the world—it all makes you someone truly remarkable. I wanted to create something
            special to show you just how much you mean to me.`}
          </p>

          <div className="space-y-4">
            <p className="text-balance text-base md:text-lg lg:text-xl font-medium text-primary">
              {`"The best things in life are the people we love, the places we've been, and the memories we've made along
              the way."`}
            </p>

          <DialogTrigger asChild>
            <Button
                size="lg"
                variant="outline"
                className="group border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground bg-transparent cursor-pointer"
                onClick={getRandomMeme}
                >
                <Heart className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="text-sm md:text-base">{`
                Happy Vietnam Women's Day!
                `}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Dear, Love</DialogTitle>
            <DialogDescription>
                Thank you for existing in this world 🥰
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <img src={isYan ? yanMeme : staticMeme} alt="" className="w-full rounded-md h-[320px]" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={getRandomMeme}>Renew</Button>
            <DialogClose asChild>
                <Button>{`Je t'aime`}</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
          </div>
        </div>

        <div
          className={`mt-6 md:mt-12 text-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-xs md:text-sm text-muted-foreground">
            Made {isYan && "by Det"} with <Heart className="inline h-4 w-4 animate-heartbeat text-primary" fill="currentColor" /> just for {toWho}
          </p>
        </div>
      </div>
      {isYan && <ArrowDown className="absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2 text-foreground/50 animate-bounce text-primary drop-shadow cursor-pointer" strokeWidth={3} onClick={onNextSlide} />}
    </section>
    </Dialog>
  )
}
