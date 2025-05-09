"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import SearchBar from "@/components/search-bar"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null)
    } else {
      setExpandedCategory(category)
    }
  }

  return (
    <>
      <button onClick={toggleMenu} aria-label="Toggle menu">
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 bg-[#2874f0] text-white">
                <h2 className="text-xl font-bold">PrinceShopfy</h2>
                <button onClick={toggleMenu} aria-label="Close menu">
                  <X size={24} />
                </button>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <SearchBar />
                </div>

                <div className="flex flex-col">
                  <Link
                    href="/login"
                    className="py-3 px-4 bg-[#2874f0] text-white rounded-sm text-center mb-4"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                </div>
              </div>

              <div className="flex-1 overflow-auto">
                <div className="border-t border-gray-200">
                  <button
                    className="flex items-center justify-between w-full p-4 hover:bg-gray-50"
                    onClick={() => toggleCategory("electronics")}
                  >
                    <span className="font-medium">Electronics</span>
                    {expandedCategory === "electronics" ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </button>

                  <AnimatePresence>
                    {expandedCategory === "electronics" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-gray-50"
                      >
                        <Link
                          href="/products?category=Electronics&subcategory=Mobiles"
                          className="block p-3 pl-8 hover:bg-gray-100"
                          onClick={toggleMenu}
                        >
                          Mobiles
                        </Link>
                        <Link
                          href="/products?category=Electronics&subcategory=Laptops"
                          className="block p-3 pl-8 hover:bg-gray-100"
                          onClick={toggleMenu}
                        >
                          Laptops
                        </Link>
                        <Link
                          href="/products?category=Electronics&subcategory=Cameras"
                          className="block p-3 pl-8 hover:bg-gray-100"
                          onClick={toggleMenu}
                        >
                          Cameras
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="border-t border-gray-200">
                  <button
                    className="flex items-center justify-between w-full p-4 hover:bg-gray-50"
                    onClick={() => toggleCategory("fashion")}
                  >
                    <span className="font-medium">Fashion</span>
                    {expandedCategory === "fashion" ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </button>

                  <AnimatePresence>
                    {expandedCategory === "fashion" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-gray-50"
                      >
                        <Link
                          href="/products?category=Fashion&subcategory=MensClothing"
                          className="block p-3 pl-8 hover:bg-gray-100"
                          onClick={toggleMenu}
                        >
                          Men's Clothing
                        </Link>
                        <Link
                          href="/products?category=Fashion&subcategory=WomensClothing"
                          className="block p-3 pl-8 hover:bg-gray-100"
                          onClick={toggleMenu}
                        >
                          Women's Clothing
                        </Link>
                        <Link
                          href="/products?category=Fashion&subcategory=Footwear"
                          className="block p-3 pl-8 hover:bg-gray-100"
                          onClick={toggleMenu}
                        >
                          Footwear
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="border-t border-gray-200">
                  <Link href="/cart" className="flex items-center w-full p-4 hover:bg-gray-50" onClick={toggleMenu}>
                    <span className="font-medium">My Cart</span>
                  </Link>
                </div>

                <div className="border-t border-gray-200">
                  <Link href="/wishlist" className="flex items-center w-full p-4 hover:bg-gray-50" onClick={toggleMenu}>
                    <span className="font-medium">My Wishlist</span>
                  </Link>
                </div>

                <div className="border-t border-gray-200">
                  <Link href="/orders" className="flex items-center w-full p-4 hover:bg-gray-50" onClick={toggleMenu}>
                    <span className="font-medium">My Orders</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
