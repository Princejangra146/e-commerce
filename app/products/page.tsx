"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Star, SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Product = {
  id: number
  name: string
  description: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  category: string
  subcategory: string
  brand: string
  image: string
  tags: string[]
  inStock: boolean
}

type Filters = {
  categories: string[]
  brands: string[]
  priceRanges: { min: number; max: number }[]
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const categoryParam = searchParams.get("category") || ""

  const [products, setProducts] = useState<Product[]>([])
  const [filters, setFilters] = useState<Filters>({ categories: [], brands: [], priceRanges: [] })
  const [loading, setLoading] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryParam ? [categoryParam] : [])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000])
  const [minRating, setMinRating] = useState<number>(0)
  const [sortOption, setSortOption] = useState<string>("relevance")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    brands: true,
    price: true,
    rating: true,
  })

  // Fetch products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        // Build query string with all filters
        const params = new URLSearchParams()
        if (query) params.append("q", query)
        if (selectedCategories.length > 0) params.append("category", selectedCategories[0])
        if (selectedBrands.length > 0) params.append("brand", selectedBrands[0])
        params.append("minPrice", priceRange[0].toString())
        params.append("maxPrice", priceRange[1].toString())
        params.append("minRating", minRating.toString())
        params.append("sort", sortOption)

        const response = await fetch(`/api/search?${params.toString()}`)
        const data = await response.json()
        setProducts(data.products)
        setFilters(data.filters)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [query, selectedCategories, selectedBrands, priceRange, minRating, sortOption, categoryParam])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, 50000])
    setMinRating(0)
    setSortOption("relevance")
  }

  const toggleFilterSection = (section: keyof typeof expandedFilters) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <main className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            {query ? `Search Results for "${query}"` : categoryParam ? `${categoryParam}` : "All Products"}
          </h1>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="discount">Discount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              className="md:hidden flex items-center gap-2"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Filters</h2>
                {(selectedCategories.length > 0 ||
                  selectedBrands.length > 0 ||
                  minRating > 0 ||
                  priceRange[0] > 0 ||
                  priceRange[1] < 50000) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-[#2874f0] hover:underline flex items-center"
                  >
                    <X size={14} className="mr-1" />
                    Clear All
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <div
                  className="flex justify-between items-center mb-2 cursor-pointer"
                  onClick={() => toggleFilterSection("categories")}
                >
                  <h3 className="font-medium">Categories</h3>
                  {expandedFilters.categories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                <AnimatePresence>
                  {expandedFilters.categories && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
                        {filters.categories.map((category) => (
                          <div key={category} className="flex items-center">
                            <Checkbox
                              id={`category-${category}`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                            />
                            <label
                              htmlFor={`category-${category}`}
                              className="ml-2 text-sm cursor-pointer hover:text-[#2874f0]"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <div
                  className="flex justify-between items-center mb-2 cursor-pointer"
                  onClick={() => toggleFilterSection("brands")}
                >
                  <h3 className="font-medium">Brands</h3>
                  {expandedFilters.brands ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                <AnimatePresence>
                  {expandedFilters.brands && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
                        {filters.brands.map((brand) => (
                          <div key={brand} className="flex items-center">
                            <Checkbox
                              id={`brand-${brand}`}
                              checked={selectedBrands.includes(brand)}
                              onCheckedChange={() => toggleBrand(brand)}
                            />
                            <label
                              htmlFor={`brand-${brand}`}
                              className="ml-2 text-sm cursor-pointer hover:text-[#2874f0]"
                            >
                              {brand}
                            </label>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <div
                  className="flex justify-between items-center mb-2 cursor-pointer"
                  onClick={() => toggleFilterSection("price")}
                >
                  <h3 className="font-medium">Price Range</h3>
                  {expandedFilters.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                <AnimatePresence>
                  {expandedFilters.price && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 px-2">
                        <Slider
                          defaultValue={[0, 50000]}
                          max={50000}
                          step={100}
                          value={priceRange}
                          onValueChange={(value) => setPriceRange(value as [number, number])}
                          className="mb-6"
                        />
                        <div className="flex justify-between text-sm">
                          <span>₹{priceRange[0]}</span>
                          <span>₹{priceRange[1]}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Customer Rating */}
              <div className="mb-6">
                <div
                  className="flex justify-between items-center mb-2 cursor-pointer"
                  onClick={() => toggleFilterSection("rating")}
                >
                  <h3 className="font-medium">Customer Rating</h3>
                  {expandedFilters.rating ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                <AnimatePresence>
                  {expandedFilters.rating && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2 mt-2">
                        {[4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center">
                            <Checkbox
                              id={`rating-${rating}`}
                              checked={minRating === rating}
                              onCheckedChange={() => setMinRating(minRating === rating ? 0 : rating)}
                            />
                            <label
                              htmlFor={`rating-${rating}`}
                              className="ml-2 text-sm cursor-pointer hover:text-[#2874f0] flex items-center"
                            >
                              {rating}
                              <Star className="h-3 w-3 ml-1 fill-yellow-400 text-yellow-400" /> & above
                            </label>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Filters Sidebar */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween" }}
                className="fixed inset-0 z-50 bg-white md:hidden overflow-y-auto"
              >
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <button onClick={() => setMobileFiltersOpen(false)}>
                    <X size={24} />
                  </button>
                </div>

                <div className="p-4">
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Sort By</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: "relevance", label: "Relevance" },
                        { value: "price_low", label: "Price: Low to High" },
                        { value: "price_high", label: "Price: High to Low" },
                        { value: "rating", label: "Rating" },
                        { value: "discount", label: "Discount" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          className={`p-2 border rounded-md text-sm ${
                            sortOption === option.value
                              ? "border-[#2874f0] bg-blue-50 text-[#2874f0]"
                              : "border-gray-200"
                          }`}
                          onClick={() => setSortOption(option.value)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <div
                      className="flex justify-between items-center mb-2"
                      onClick={() => toggleFilterSection("categories")}
                    >
                      <h3 className="font-medium">Categories</h3>
                      {expandedFilters.categories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>

                    {expandedFilters.categories && (
                      <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
                        {filters.categories.map((category) => (
                          <div key={category} className="flex items-center">
                            <Checkbox
                              id={`mobile-category-${category}`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                            />
                            <label htmlFor={`mobile-category-${category}`} className="ml-2 text-sm cursor-pointer">
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Brands */}
                  <div className="mb-6">
                    <div
                      className="flex justify-between items-center mb-2"
                      onClick={() => toggleFilterSection("brands")}
                    >
                      <h3 className="font-medium">Brands</h3>
                      {expandedFilters.brands ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>

                    {expandedFilters.brands && (
                      <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
                        {filters.brands.map((brand) => (
                          <div key={brand} className="flex items-center">
                            <Checkbox
                              id={`mobile-brand-${brand}`}
                              checked={selectedBrands.includes(brand)}
                              onCheckedChange={() => toggleBrand(brand)}
                            />
                            <label htmlFor={`mobile-brand-${brand}`} className="ml-2 text-sm cursor-pointer">
                              {brand}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <div
                      className="flex justify-between items-center mb-2"
                      onClick={() => toggleFilterSection("price")}
                    >
                      <h3 className="font-medium">Price Range</h3>
                      {expandedFilters.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>

                    {expandedFilters.price && (
                      <div className="mt-4 px-2">
                        <Slider
                          defaultValue={[0, 50000]}
                          max={50000}
                          step={100}
                          value={priceRange}
                          onValueChange={(value) => setPriceRange(value as [number, number])}
                          className="mb-6"
                        />
                        <div className="flex justify-between text-sm">
                          <span>₹{priceRange[0]}</span>
                          <span>₹{priceRange[1]}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Customer Rating */}
                  <div className="mb-6">
                    <div
                      className="flex justify-between items-center mb-2"
                      onClick={() => toggleFilterSection("rating")}
                    >
                      <h3 className="font-medium">Customer Rating</h3>
                      {expandedFilters.rating ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>

                    {expandedFilters.rating && (
                      <div className="space-y-2 mt-2">
                        {[4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center">
                            <Checkbox
                              id={`mobile-rating-${rating}`}
                              checked={minRating === rating}
                              onCheckedChange={() => setMinRating(minRating === rating ? 0 : rating)}
                            />
                            <label
                              htmlFor={`mobile-rating-${rating}`}
                              className="ml-2 text-sm cursor-pointer flex items-center"
                            >
                              {rating}
                              <Star className="h-3 w-3 ml-1 fill-yellow-400 text-yellow-400" /> & above
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="sticky bottom-0 bg-white pt-4 pb-4 border-t flex gap-4">
                    <Button variant="outline" className="flex-1" onClick={clearAllFilters}>
                      Clear All
                    </Button>
                    <Button className="flex-1" onClick={() => setMobileFiltersOpen(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Active Filters */}
            {(selectedCategories.length > 0 ||
              selectedBrands.length > 0 ||
              minRating > 0 ||
              priceRange[0] > 0 ||
              priceRange[1] < 50000) && (
              <div className="bg-white rounded-lg shadow-sm p-3 mb-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium">Applied Filters:</span>
                  {selectedCategories.map((category) => (
                    <div
                      key={category}
                      className="flex items-center bg-blue-50 text-[#2874f0] px-2 py-1 rounded-full text-xs"
                    >
                      {category}
                      <button onClick={() => toggleCategory(category)} className="ml-1">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  {selectedBrands.map((brand) => (
                    <div
                      key={brand}
                      className="flex items-center bg-blue-50 text-[#2874f0] px-2 py-1 rounded-full text-xs"
                    >
                      {brand}
                      <button onClick={() => toggleBrand(brand)} className="ml-1">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  {minRating > 0 && (
                    <div className="flex items-center bg-blue-50 text-[#2874f0] px-2 py-1 rounded-full text-xs">
                      {minRating}+ Stars
                      <button onClick={() => setMinRating(0)} className="ml-1">
                        <X size={12} />
                      </button>
                    </div>
                  )}
                  {(priceRange[0] > 0 || priceRange[1] < 50000) && (
                    <div className="flex items-center bg-blue-50 text-[#2874f0] px-2 py-1 rounded-full text-xs">
                      ₹{priceRange[0]} - ₹{priceRange[1]}
                      <button onClick={() => setPriceRange([0, 50000])} className="ml-1">
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Sort Options */}
            <div className="md:hidden bg-white rounded-lg shadow-sm p-3 mb-4">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="discount">Discount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2874f0]"></div>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="flex justify-center mb-4">
                  <Image src="/placeholder.svg?height=200&width=200" alt="No Results" width={200} height={200} />
                </div>
                <h2 className="text-xl font-medium mb-2">No products found</h2>
                <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                <Button onClick={clearAllFilters}>Clear All Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <Link href={`/product/${product.id}`} className="block relative">
                      <div className="relative h-40 sm:h-48 w-full bg-gray-100">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-contain p-4"
                        />
                      </div>

                      <div className="p-3">
                        <h3 className="font-medium text-sm line-clamp-2 hover:text-[#2874f0] transition-colors">
                          {product.name}
                        </h3>

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

                        <div className="mt-1 text-xs text-gray-500">{product.brand}</div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
