"use client"
import Link from "next/link"
import ProductCard from "@/components/product-card"

// Mock data for featured products
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    image: "/placeholder.svg?height=200&width=200",
    price: 1999,
    originalPrice: 3999,
    rating: 4.5,
    reviews: 2456,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Men's Casual T-Shirt",
    image: "/placeholder.svg?height=200&width=200",
    price: 499,
    originalPrice: 999,
    rating: 4.2,
    reviews: 1289,
    category: "Fashion",
  },
  {
    id: 3,
    name: "Smart Watch Series 5",
    image: "/placeholder.svg?height=200&width=200",
    price: 2499,
    originalPrice: 3999,
    rating: 4.7,
    reviews: 3421,
    category: "Electronics",
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    image: "/placeholder.svg?height=200&width=200",
    price: 399,
    originalPrice: 799,
    rating: 4.3,
    reviews: 876,
    category: "Home",
  },
  {
    id: 5,
    name: "Wireless Gaming Mouse",
    image: "/placeholder.svg?height=200&width=200",
    price: 1299,
    originalPrice: 2499,
    rating: 4.6,
    reviews: 1543,
    category: "Electronics",
  },
  {
    id: 6,
    name: "Women's Running Shoes",
    image: "/placeholder.svg?height=200&width=200",
    price: 1799,
    originalPrice: 3499,
    rating: 4.4,
    reviews: 2187,
    category: "Fashion",
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    image: "/placeholder.svg?height=200&width=200",
    price: 1499,
    originalPrice: 2999,
    rating: 4.5,
    reviews: 1876,
    category: "Electronics",
  },
  {
    id: 8,
    name: "Non-Stick Cookware Set",
    image: "/placeholder.svg?height=200&width=200",
    price: 2999,
    originalPrice: 5999,
    rating: 4.8,
    reviews: 943,
    category: "Home",
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/products" className="text-[#2874f0] hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
