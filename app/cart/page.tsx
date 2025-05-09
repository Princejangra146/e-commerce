"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, Plus, Minus } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    image: "/placeholder.svg?height=200&width=200",
    price: 1999,
    originalPrice: 3999,
    quantity: 1,
    color: "Black",
    seller: "SoundTech",
  },
  {
    id: 2,
    name: "Men's Casual T-Shirt",
    image: "/placeholder.svg?height=200&width=200",
    price: 499,
    originalPrice: 999,
    quantity: 2,
    color: "Blue",
    size: "L",
    seller: "FashionHub",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const discount = cartItems.reduce((total, item) => total + (item.originalPrice - item.price) * item.quantity, 0)
  const deliveryCharge = subtotal > 1000 ? 0 : 40
  const total = subtotal + deliveryCharge

  return (
    <main className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart ({cartItems.length} items)</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <Image src="/placeholder.svg?height=200&width=200" alt="Empty Cart" width={200} height={200} />
            </div>
            <h2 className="text-xl font-medium mb-2">Your cart is empty!</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 flex flex-col sm:flex items-center gap-4 ${
                      index < cartItems.length - 1 ? "border-b border-gray-200" : ""
                    }`}
                  >
                    <div className="flex flex-1 w-full">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="ml-4 flex-1">
                        <Link href={`/product/${item.id}`} className="font-medium hover:text-[#2874f0] line-clamp-2">
                          {item.name}
                        </Link>

                        <div className="text-sm text-gray-500 mt-1">
                          {item.color && <span>Color: {item.color}</span>}
                          {item.size && <span className="ml-2">Size: {item.size}</span>}
                        </div>

                        <div className="text-sm text-gray-500 mt-1">Seller: {item.seller}</div>

                        <div className="flex items-center mt-2">
                          <span className="font-bold">₹{item.price}</span>
                          <span className="text-gray-500 line-through text-sm ml-2">₹{item.originalPrice}</span>
                          <span className="text-green-600 text-sm ml-2">
                            {Math.round((1 - item.price / item.originalPrice) * 100)}% off
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-4 mt-4 sm:mt-0">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          className="px-2 py-1 text-gray-600"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 py-1 border-l border-r border-gray-300">{item.quantity}</span>
                        <button
                          className="px-2 py-1 text-gray-600"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button className="text-gray-600 hover:text-red-500" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <Link href="/checkout">
                  <Button className="px-8">Proceed to Checkout</Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-medium pb-4 border-b">Order Summary</h2>

                <div className="mt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600">- ₹{discount}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Charges</span>
                    {deliveryCharge === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      <span>₹{deliveryCharge}</span>
                    )}
                  </div>

                  <div className="flex justify-between pt-3 border-t font-bold">
                    <span>Total Amount</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t text-green-600 font-medium">
                  You will save ₹{discount} on this order
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
                <h2 className="text-lg font-medium mb-4">Apply Coupon</h2>

                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:border-[#2874f0]"
                  />
                  <Button variant="secondary" className="rounded-l-none">
                    Apply
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
                <h2 className="text-lg font-medium mb-4">Payment Methods</h2>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Image
                      src="/placeholder.svg?height=30&width=40"
                      alt="Credit Card"
                      width={40}
                      height={30}
                      className="mr-2"
                    />
                    <span>Credit/Debit Card</span>
                  </div>

                  <div className="flex items-center">
                    <Image
                      src="/placeholder.svg?height=30&width=40"
                      alt="UPI"
                      width={40}
                      height={30}
                      className="mr-2"
                    />
                    <span>UPI</span>
                  </div>

                  <div className="flex items-center">
                    <Image
                      src="/placeholder.svg?height=30&width=40"
                      alt="Net Banking"
                      width={40}
                      height={30}
                      className="mr-2"
                    />
                    <span>Net Banking</span>
                  </div>

                  <div className="flex items-center">
                    <Image
                      src="/placeholder.svg?height=30&width=40"
                      alt="Cash on Delivery"
                      width={40}
                      height={30}
                      className="mr-2"
                    />
                    <span>Cash on Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
