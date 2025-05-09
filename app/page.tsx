import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, User, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import FeaturedProducts from "@/components/featured-products"
import CategorySection from "@/components/category-section"
import DealsSection from "@/components/deals-section"
import HeroSlider from "@/components/hero-slider"
import MobileNav from "@/components/mobile-nav"
import SearchBar from "@/components/search-bar"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-[#2874f0] text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-1">
              <Link href="/" className="flex items-center">
                <h1 className="text-2xl font-bold">PrinceShopfy</h1>
                <span className="text-xs italic text-yellow-200 ml-1">
                  Explore <span className="text-yellow-400">Plus</span>
                </span>
              </Link>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex mx-4">
              <SearchBar />
            </div>

            {/* Navigation - Hidden on mobile */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/login" className="flex items-center gap-1 hover:underline">
                <Button variant="secondary" className="font-medium">
                  Login
                </Button>
              </Link>
              <Link href="/cart" className="flex items-center gap-1 hover:underline">
                <ShoppingCart size={20} />
                <span>Cart</span>
              </Link>
              <Link href="/wishlist" className="flex items-center gap-1 hover:underline">
                <Heart size={20} />
                <span>Wishlist</span>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <Link href="/cart">
                <ShoppingCart size={20} />
              </Link>
              <Link href="/login">
                <User size={20} />
              </Link>
              <MobileNav />
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-3 gap-8 scrollbar-hide">
            <Link href={`/products?category=Electronics`} className="flex flex-col items-center min-w-[80px] group">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-1 group-hover:bg-gray-200 transition-all">
                <Image src="/placeholder.svg?height=64&width=64" alt="Electronics" width={40} height={40} />
              </div>
              <span className="text-xs text-center group-hover:text-[#2874f0] transition-colors">Electronics</span>
            </Link>
            <Link href={`/products?category=Fashion`} className="flex flex-col items-center min-w-[80px] group">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-1 group-hover:bg-gray-200 transition-all">
                <Image src="/placeholder.svg?height=64&width=64" alt="Fashion" width={40} height={40} />
              </div>
              <span className="text-xs text-center group-hover:text-[#2874f0] transition-colors">Fashion</span>
            </Link>
            <Link href={`/products?category=Home`} className="flex flex-col items-center min-w-[80px] group">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-1 group-hover:bg-gray-200 transition-all">
                <Image src="/placeholder.svg?height=64&width=64" alt="Home" width={40} height={40} />
              </div>
              <span className="text-xs text-center group-hover:text-[#2874f0] transition-colors">Home</span>
            </Link>
            <Link href={`/products?category=Appliances`} className="flex flex-col items-center min-w-[80px] group">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-1 group-hover:bg-gray-200 transition-all">
                <Image src="/placeholder.svg?height=64&width=64" alt="Appliances" width={40} height={40} />
              </div>
              <span className="text-xs text-center group-hover:text-[#2874f0] transition-colors">Appliances</span>
            </Link>
            <Link href={`/products?category=Beauty`} className="flex flex-col items-center min-w-[80px] group">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-1 group-hover:bg-gray-200 transition-all">
                <Image src="/placeholder.svg?height=64&width=64" alt="Beauty" width={40} height={40} />
              </div>
              <span className="text-xs text-center group-hover:text-[#2874f0] transition-colors">Beauty</span>
            </Link>
            <Link href={`/products?category=Toys`} className="flex flex-col items-center min-w-[80px] group">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-1 group-hover:bg-gray-200 transition-all">
                <Image src="/placeholder.svg?height=64&width=64" alt="Toys" width={40} height={40} />
              </div>
              <span className="text-xs text-center group-hover:text-[#2874f0] transition-colors">Toys</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Slider */}
      <HeroSlider />

      {/* Deals of the Day */}
      <DealsSection />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Categories */}
      <CategorySection />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-300 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="text-gray-300 hover:text-white">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="/corporate-info" className="text-gray-300 hover:text-white">
                    Corporate Information
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Help</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/payments" className="text-gray-300 hover:text-white">
                    Payments
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-gray-300 hover:text-white">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-gray-300 hover:text-white">
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-300 hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Policy</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/return-policy" className="text-gray-300 hover:text-white">
                    Return Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-white">
                    Terms Of Use
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-gray-300 hover:text-white">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-white">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Social</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="https://facebook.com" className="text-gray-300 hover:text-white">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="https://twitter.com" className="text-gray-300 hover:text-white">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="https://youtube.com" className="text-gray-300 hover:text-white">
                    YouTube
                  </Link>
                </li>
                <li>
                  <Link href="https://instagram.com" className="text-gray-300 hover:text-white">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2023 PrinceShopfy. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <Image src="/placeholder.svg?height=40&width=120" alt="Payment Methods" width={120} height={40} />
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
