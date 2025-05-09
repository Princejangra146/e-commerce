"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock product data
const product = {
  id: 1,
  name: "Wireless Bluetooth Earbuds with Noise Cancellation",
  description:
    "Experience premium sound quality with these wireless earbuds featuring active noise cancellation, touch controls, and long battery life.",
  price: 1999,
  originalPrice: 3999,
  discount: 50,
  rating: 4.5,
  reviews: 2456,
  inStock: true,
  category: "Electronics",
  brand: "SoundTech",
  images: [
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
  ],
  colors: ["Black", "White", "Blue"],
  highlights: [
    "Active Noise Cancellation",
    "Touch Controls",
    "Up to 30 hours battery life",
    "IPX7 Waterproof",
    "Bluetooth 5.2",
  ],
  specifications: {
    Brand: "SoundTech",
    Model: "ST-TWS-ANC",
    Color: "Multiple options",
    "Headphone Type": "True Wireless",
    Connectivity: "Bluetooth 5.2",
    "Battery Life": "Up to 30 hours with case",
    "Charging Time": "1.5 hours",
    "Noise Cancellation": "Active",
    "Water Resistance": "IPX7",
    Warranty: "1 Year",
  },
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("Black")
  const [quantity, setQuantity] = useState(1)

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-[#2874f0]">
            Home
          </Link>{" "}
          &gt;{" "}
          <Link href="/category/electronics" className="hover:text-[#2874f0]">
            Electronics
          </Link>{" "}
          &gt; <span className="text-gray-700">Wireless Earbuds</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-4 rounded-lg shadow-sm">
          {/* Product Images */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="order-2 md:order-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[500px] scrollbar-thin">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`min-w-[60px] h-[60px] border-2 rounded ${
                    selectedImage === index ? "border-[#2874f0]" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - View ${index + 1}`}
                    width={60}
                    height={60}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>

            <div className="order-1 md:order-2 flex-1 relative">
              <div className="sticky top-0">
                <div className="relative h-[300px] md:h-[500px] w-full bg-white flex items-center justify-center">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={product.images[selectedImage] || "/placeholder.svg"}
                      alt={product.name}
                      width={500}
                      height={500}
                      className="max-h-[300px] md:max-h-[500px] object-contain"
                    />
                  </motion.div>
                </div>

                <div className="flex justify-center gap-4 mt-4">
                  <Button>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="secondary">Buy Now</Button>
                  <Button variant="outline" size="icon">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-xl md:text-2xl font-medium">{product.name}</h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center bg-green-700 text-white text-xs px-2 py-0.5 rounded">
                <span>{product.rating}</span>
                <Star className="h-3 w-3 ml-0.5 fill-white" />
              </div>
              <span className="text-gray-500 text-sm">{product.reviews} Ratings & Reviews</span>
            </div>

            <div className="mt-4">
              <span className="text-green-600 font-medium">Special Price</span>
              <div className="flex items-center mt-1">
                <span className="text-2xl md:text-3xl font-bold">₹{product.price}</span>
                <span className="text-gray-500 line-through text-base ml-2">₹{product.originalPrice}</span>
                <span className="text-green-600 text-base ml-2">{product.discount}% off</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Available Colors</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`border-2 rounded-full px-4 py-1 ${
                      selectedColor === color ? "border-[#2874f0] bg-blue-50" : "border-gray-300"
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  className="border border-gray-300 rounded-l px-3 py-1"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="border-t border-b border-gray-300 px-4 py-1">{quantity}</span>
                <button
                  className="border border-gray-300 rounded-r px-3 py-1"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Highlights</h3>
              <ul className="list-disc list-inside space-y-1">
                {product.highlights.map((highlight, index) => (
                  <li key={index} className="text-gray-700">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-gray-600 mr-2" />
                <span className="text-sm">Free Delivery</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-gray-600 mr-2" />
                <span className="text-sm">1 Year Warranty</span>
              </div>
              <div className="flex items-center">
                <RotateCcw className="h-5 w-5 text-gray-600 mr-2" />
                <span className="text-sm">7 Days Replacement</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-4">
          <Tabs defaultValue="description">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="p-4">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              <p className="text-gray-700 leading-relaxed mt-4">
                These premium wireless earbuds deliver exceptional sound quality with deep bass and crystal-clear highs.
                The active noise cancellation technology blocks out ambient noise, allowing you to focus on your music
                or calls without distractions.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                With intuitive touch controls, you can easily manage your music, calls, and voice assistant. The earbuds
                provide up to 6 hours of playback on a single charge, and the charging case extends the battery life to
                a total of 30 hours.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                The IPX7 waterproof rating ensures protection against sweat and rain, making these earbuds perfect for
                workouts and outdoor activities. The ergonomic design provides a secure and comfortable fit for extended
                wear.
              </p>
            </TabsContent>

            <TabsContent value="specifications" className="p-4">
              <table className="w-full border-collapse">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-2 px-4 border border-gray-200 font-medium">{key}</td>
                      <td className="py-2 px-4 border border-gray-200">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>

            <TabsContent value="reviews" className="p-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-700">{product.rating}</div>
                    <div className="flex justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{product.reviews} ratings</div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <div className="flex items-center">
                      <span className="text-sm w-8">5 ★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                      <span className="text-sm w-8">70%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-8">4 ★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                      <span className="text-sm w-8">20%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-8">3 ★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: "5%" }}></div>
                      </div>
                      <span className="text-sm w-8">5%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-8">2 ★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: "3%" }}></div>
                      </div>
                      <span className="text-sm w-8">3%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-8">1 ★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: "2%" }}></div>
                      </div>
                      <span className="text-sm w-8">2%</span>
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3">
                  <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>

                  <div className="space-y-6">
                    {/* Sample reviews */}
                    <div className="border-b pb-4">
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium">Great sound quality!</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        These earbuds have amazing sound quality and the noise cancellation works really well. Battery
                        life is also impressive. Definitely worth the price!
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        <span>Rahul S. | 15 Apr 2023</span>
                      </div>
                    </div>

                    <div className="border-b pb-4">
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium">Perfect for workouts!</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        I use these earbuds during my workouts and they stay in place perfectly. The waterproof feature
                        is great for sweaty sessions. Sound quality is excellent too.
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        <span>Priya M. | 2 Mar 2023</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 3 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium">Good but could be better</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        The sound quality is good but the touch controls can be a bit finicky sometimes. Battery life is
                        as advertised. Overall decent for the price.
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        <span>Amit K. | 18 Feb 2023</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="mt-6 w-full">
                    Load More Reviews
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Similar Products */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Similar Products</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <Link href={`/product/${item + 10}`}>
                  <div className="relative h-40 w-full bg-gray-100">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Similar Product"
                      fill
                      className="object-contain p-4"
                    />
                  </div>

                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2">Wireless Headphones with Noise Cancellation</h3>

                    <div className="flex items-center mt-1">
                      <div className="flex items-center bg-green-700 text-white text-xs px-1 rounded">
                        <span>4.2</span>
                        <Star className="h-3 w-3 ml-0.5 fill-white" />
                      </div>
                      <span className="text-gray-500 text-xs ml-2">(1,234)</span>
                    </div>

                    <div className="mt-2 flex items-center">
                      <span className="font-bold">₹1,499</span>
                      <span className="text-gray-500 line-through text-sm ml-2">₹2,999</span>
                      <span className="text-green-600 text-sm ml-2">50% off</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
