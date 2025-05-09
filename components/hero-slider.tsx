"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    id: 1,
    image: "/placeholder.svg?height=400&width=1200",
    alt: "Big Sale on Electronics",
    title: "Big Sale on Electronics",
    subtitle: "Up to 50% off on selected items",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=400&width=1200",
    alt: "New Fashion Collection",
    title: "New Fashion Collection",
    subtitle: "Discover the latest trends",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=400&width=1200",
    alt: "Home Appliances",
    title: "Home Appliances",
    subtitle: "Special offers on home appliances",
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [current])

  return (
    <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden bg-gray-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image || "/placeholder.svg"}
            alt={slides[current].alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-white">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-4xl font-bold text-center"
            >
              {slides[current].title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm md:text-xl mt-2"
            >
              {slides[current].subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 text-white" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === current ? "bg-white w-4" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
