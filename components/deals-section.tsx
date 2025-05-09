"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { motion } from "framer-motion"

// Mock data for deals
const deals = [
  {
    id: 1,
    title: "Best of Electronics",
    image: "/placeholder.svg?height=150&width=150",
    discount: "Up to 80% Off",
    items: ["Laptops", "Cameras", "Speakers"],
  },
  {
    id: 2,
    title: "Fashion Deals",
    image: "/placeholder.svg?height=150&width=150",
    discount: "40-70% Off",
    items: ["Men's Wear", "Women's Wear", "Footwear"],
  },
  {
    id: 3,
    title: "Home Essentials",
    image: "/placeholder.svg?height=150&width=150",
    discount: "From ₹499",
    items: ["Kitchenware", "Furniture", "Decor"],
  },
  {
    id: 4,
    title: "Toys & Baby Products",
    image: "/placeholder.svg?height=150&width=150",
    discount: "Up to 60% Off",
    items: ["Toys", "Diapers", "Baby Care"],
  },
  {
    id: 5,
    title: "Fitness Equipment",
    image: "/placeholder.svg?height=150&width=150",
    discount: "Min 30% Off",
    items: ["Treadmills", "Dumbbells", "Yoga Mats"],
  },
  {
    id: 6,
    title: "Books & Stationery",
    image: "/placeholder.svg?height=150&width=150",
    discount: "Up to 50% Off",
    items: ["Fiction", "Academic", "Art Supplies"],
  },
]

export default function DealsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold">Deals of the Day</h2>
            <div className="flex items-center ml-4 text-gray-600">
              <Clock className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">22:10:36 Left</span>
            </div>
          </div>
          <Link href="/deals" className="text-[#2874f0] hover:underline">
            View All
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div ref={scrollRef} className="flex overflow-x-auto gap-4 py-4 scrollbar-hide scroll-smooth">
            {deals.map((deal) => (
              <motion.div
                key={deal.id}
                className="min-w-[200px] sm:min-w-[220px] bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center p-4"
                whileHover={{ y: -5 }}
              >
                <Image
                  src={deal.image || "/placeholder.svg"}
                  alt={deal.title}
                  width={150}
                  height={150}
                  className="mb-4"
                />
                <h3 className="font-medium text-center">{deal.title}</h3>
                <p className="text-green-600 my-1">{deal.discount}</p>
                <p className="text-gray-500 text-sm text-center">{deal.items.join(" • ")}</p>
              </motion.div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
