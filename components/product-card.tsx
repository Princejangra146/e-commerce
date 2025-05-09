"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Star, Eye } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

type ProductCardProps = {
  product: {
    id: number
    name: string
    image: string
    price: number
    originalPrice: number
    rating: number
    reviews: number
    category?: string
    brand?: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const addToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    })
  }

  const quickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Implement quick view modal here
    toast({
      title: "Quick view",
      description: `Quick view for ${product.name}.`,
    })
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="block relative">
        <div className="relative h-40 sm:h-48 md:h-56 w-full bg-gray-100">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain p-4" />
        </div>

        {isHovered && (
          <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Button variant="secondary" size="sm" className="bg-white hover:bg-gray-100" onClick={quickView}>
              <Eye className="h-4 w-4 mr-1" />
              Quick View
            </Button>
          </div>
        )}
      </Link>

      <div className="p-3">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-sm sm:text-base line-clamp-2 hover:text-[#2874f0] transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mt-1">
          <div className="flex items-center bg-green-700 text-white text-xs px-1 rounded">
            <span>{product.rating}</span>
            <Star className="h-3 w-3 ml-0.5 fill-white" />
          </div>
          <span className="text-gray-500 text-xs ml-2">({product.reviews})</span>
        </div>

        <div className="mt-2 flex items-center">
          <span className="font-bold">₹{product.price}</span>
          <span className="text-gray-500 line-through text-sm ml-2">₹{product.originalPrice}</span>
          <span className="text-green-600 text-sm ml-2">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% off
          </span>
        </div>

        {product.brand && <div className="mt-1 text-xs text-gray-500">{product.brand}</div>}

        <div className="mt-3 flex space-x-2">
          <Button size="sm" className="flex-1 h-8" onClick={addToCart}>
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={addToWishlist}>
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
