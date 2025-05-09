"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type SearchSuggestion = {
  id: number
  name: string
  category: string
  image: string
}

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Fetch suggestions when query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([])
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&suggestions=true`)
        const data = await response.json()
        setSuggestions(data.suggestions)
      } catch (error) {
        console.error("Error fetching suggestions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    const debounce = setTimeout(() => {
      fetchSuggestions()
    }, 300)

    return () => clearTimeout(debounce)
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query.trim())}`)
      setIsFocused(false)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setSuggestions([])
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div ref={searchRef} className="relative flex-1 max-w-xl">
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search for products, brands and more"
            className="w-full py-2 px-4 pr-10 rounded-sm text-black focus:outline-none border-2 border-transparent focus:border-[#2874f0]"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#2874f0]"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>
      </form>

      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 mt-1 w-full bg-white rounded-sm shadow-lg max-h-96 overflow-y-auto"
          >
            <ul className="py-2">
              {suggestions.map((suggestion) => (
                <li key={suggestion.id}>
                  <Link
                    href={`/product/${suggestion.id}`}
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsFocused(false)}
                  >
                    <div className="w-10 h-10 relative flex-shrink-0">
                      <Image
                        src={suggestion.image || "/placeholder.svg"}
                        alt={suggestion.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{suggestion.name}</p>
                      <p className="text-xs text-gray-500">in {suggestion.category}</p>
                    </div>
                  </Link>
                </li>
              ))}
              <li className="border-t mt-2 pt-2">
                <button
                  onClick={handleSearch}
                  className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 text-[#2874f0]"
                >
                  <Search size={16} className="mr-2" />
                  <span>Search for &quot;{query}&quot;</span>
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
