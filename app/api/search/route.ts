import { NextResponse } from "next/server"

// Mock product database
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    description: "Experience premium sound quality with these wireless earbuds featuring active noise cancellation.",
    price: 1999,
    originalPrice: 3999,
    rating: 4.5,
    reviews: 2456,
    category: "Electronics",
    subcategory: "Audio",
    brand: "SoundTech",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["wireless", "earbuds", "bluetooth", "audio", "headphones"],
    inStock: true,
  },
  {
    id: 2,
    name: "Men's Casual T-Shirt",
    description: "Comfortable cotton t-shirt for everyday wear.",
    price: 499,
    originalPrice: 999,
    rating: 4.2,
    reviews: 1289,
    category: "Fashion",
    subcategory: "Men's Clothing",
    brand: "FashionHub",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["t-shirt", "casual", "men", "clothing", "cotton"],
    inStock: true,
  },
  {
    id: 3,
    name: "Smart Watch Series 5",
    description: "Track your fitness and stay connected with this advanced smartwatch.",
    price: 2499,
    originalPrice: 3999,
    rating: 4.7,
    reviews: 3421,
    category: "Electronics",
    subcategory: "Wearables",
    brand: "TechGear",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["smartwatch", "fitness", "wearable", "tech", "watch"],
    inStock: true,
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    description: "Keep your drinks hot or cold for hours with this insulated water bottle.",
    price: 399,
    originalPrice: 799,
    rating: 4.3,
    reviews: 876,
    category: "Home",
    subcategory: "Kitchen",
    brand: "HomeEssentials",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["water bottle", "stainless steel", "kitchen", "hydration"],
    inStock: true,
  },
  {
    id: 5,
    name: "Wireless Gaming Mouse",
    description: "Precision gaming mouse with customizable RGB lighting and programmable buttons.",
    price: 1299,
    originalPrice: 2499,
    rating: 4.6,
    reviews: 1543,
    category: "Electronics",
    subcategory: "Gaming",
    brand: "GamePro",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["mouse", "gaming", "wireless", "rgb", "computer accessories"],
    inStock: true,
  },
  {
    id: 6,
    name: "Women's Running Shoes",
    description: "Lightweight and comfortable running shoes with excellent cushioning.",
    price: 1799,
    originalPrice: 3499,
    rating: 4.4,
    reviews: 2187,
    category: "Fashion",
    subcategory: "Footwear",
    brand: "SportsFit",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["shoes", "running", "women", "footwear", "sports"],
    inStock: true,
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    description: "Powerful sound in a compact, waterproof design for music on the go.",
    price: 1499,
    originalPrice: 2999,
    rating: 4.5,
    reviews: 1876,
    category: "Electronics",
    subcategory: "Audio",
    brand: "SoundTech",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["speaker", "bluetooth", "portable", "audio", "waterproof"],
    inStock: true,
  },
  {
    id: 8,
    name: "Non-Stick Cookware Set",
    description: "Complete set of non-stick pots and pans for all your cooking needs.",
    price: 2999,
    originalPrice: 5999,
    rating: 4.8,
    reviews: 943,
    category: "Home",
    subcategory: "Kitchen",
    brand: "KitchenPro",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["cookware", "kitchen", "non-stick", "pots", "pans"],
    inStock: true,
  },
  {
    id: 9,
    name: "4K Ultra HD Smart TV",
    description: "Immersive viewing experience with vibrant colors and smart features.",
    price: 32999,
    originalPrice: 45999,
    rating: 4.6,
    reviews: 1245,
    category: "Electronics",
    subcategory: "Televisions",
    brand: "VisionTech",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["tv", "television", "4k", "smart tv", "entertainment"],
    inStock: true,
  },
  {
    id: 10,
    name: "Laptop Backpack",
    description: "Durable backpack with padded compartments for your laptop and accessories.",
    price: 899,
    originalPrice: 1499,
    rating: 4.3,
    reviews: 2156,
    category: "Fashion",
    subcategory: "Bags",
    brand: "TravelGear",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["backpack", "laptop", "bag", "travel", "accessories"],
    inStock: true,
  },
  {
    id: 11,
    name: "Digital SLR Camera",
    description: "Capture stunning photos and videos with this professional-grade camera.",
    price: 28999,
    originalPrice: 35999,
    rating: 4.7,
    reviews: 876,
    category: "Electronics",
    subcategory: "Cameras",
    brand: "PhotoPro",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["camera", "dslr", "photography", "digital", "video"],
    inStock: true,
  },
  {
    id: 12,
    name: "Yoga Mat",
    description: "Non-slip, eco-friendly yoga mat for comfortable practice.",
    price: 799,
    originalPrice: 1299,
    rating: 4.4,
    reviews: 1432,
    category: "Sports",
    subcategory: "Yoga",
    brand: "FitLife",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["yoga", "mat", "fitness", "exercise", "workout"],
    inStock: true,
  },
  {
    id: 13,
    name: "Coffee Maker",
    description: "Programmable coffee maker for the perfect brew every morning.",
    price: 1999,
    originalPrice: 3499,
    rating: 4.5,
    reviews: 1876,
    category: "Home",
    subcategory: "Kitchen",
    brand: "BrewMaster",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["coffee", "coffee maker", "kitchen", "appliance", "brewing"],
    inStock: true,
  },
  {
    id: 14,
    name: "Wireless Keyboard and Mouse Combo",
    description: "Ergonomic keyboard and mouse set for comfortable typing and navigation.",
    price: 1499,
    originalPrice: 2499,
    rating: 4.3,
    reviews: 1243,
    category: "Electronics",
    subcategory: "Computer Accessories",
    brand: "TechGear",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["keyboard", "mouse", "wireless", "computer", "accessories"],
    inStock: true,
  },
  {
    id: 15,
    name: "Air Purifier",
    description: "Remove allergens and pollutants for cleaner, healthier air in your home.",
    price: 3999,
    originalPrice: 5999,
    rating: 4.6,
    reviews: 987,
    category: "Home",
    subcategory: "Appliances",
    brand: "PureAir",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["air purifier", "home", "appliance", "air quality", "health"],
    inStock: true,
  },
  {
    id: 16,
    name: "Protein Powder",
    description: "High-quality protein supplement for muscle recovery and growth.",
    price: 1299,
    originalPrice: 1999,
    rating: 4.4,
    reviews: 2345,
    category: "Health",
    subcategory: "Supplements",
    brand: "NutriFit",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["protein", "supplement", "fitness", "nutrition", "workout"],
    inStock: true,
  },
  {
    id: 17,
    name: "Wireless Headphones",
    description: "Over-ear headphones with noise cancellation and long battery life.",
    price: 2499,
    originalPrice: 3999,
    rating: 4.7,
    reviews: 1876,
    category: "Electronics",
    subcategory: "Audio",
    brand: "SoundTech",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["headphones", "wireless", "audio", "noise cancellation", "bluetooth"],
    inStock: true,
  },
  {
    id: 18,
    name: "Desk Lamp",
    description: "Adjustable LED desk lamp with multiple brightness levels and color temperatures.",
    price: 799,
    originalPrice: 1299,
    rating: 4.3,
    reviews: 876,
    category: "Home",
    subcategory: "Lighting",
    brand: "LightPro",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["lamp", "desk", "led", "lighting", "home office"],
    inStock: true,
  },
  {
    id: 19,
    name: "Smartphone",
    description: "Feature-packed smartphone with high-resolution camera and fast processor.",
    price: 12999,
    originalPrice: 15999,
    rating: 4.6,
    reviews: 3421,
    category: "Electronics",
    subcategory: "Mobiles",
    brand: "TechGear",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["smartphone", "mobile", "phone", "android", "camera"],
    inStock: true,
  },
  {
    id: 20,
    name: "Electric Toothbrush",
    description: "Advanced electric toothbrush for superior cleaning and gum health.",
    price: 999,
    originalPrice: 1999,
    rating: 4.5,
    reviews: 1432,
    category: "Health",
    subcategory: "Personal Care",
    brand: "DentalCare",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["toothbrush", "electric", "dental", "oral care", "hygiene"],
    inStock: true,
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.toLowerCase() || ""
  const category = searchParams.get("category")
  const minPrice = Number(searchParams.get("minPrice")) || 0
  const maxPrice = Number(searchParams.get("maxPrice")) || Number.POSITIVE_INFINITY
  const minRating = Number(searchParams.get("minRating")) || 0
  const brand = searchParams.get("brand")
  const sort = searchParams.get("sort") || "relevance"

  // Filter products based on search query and filters
  const filteredProducts = products.filter((product) => {
    // Search query matching
    const matchesQuery =
      query === "" ||
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.tags.some((tag) => tag.toLowerCase().includes(query)) ||
      product.brand.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)

    // Category filter
    const matchesCategory = !category || product.category === category || product.subcategory === category

    // Price range filter
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice

    // Rating filter
    const matchesRating = product.rating >= minRating

    // Brand filter
    const matchesBrand = !brand || product.brand === brand

    return matchesQuery && matchesCategory && matchesPrice && matchesRating && matchesBrand
  })

  // Sort products
  if (sort === "price_low") {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sort === "price_high") {
    filteredProducts.sort((a, b) => b.price - a.price)
  } else if (sort === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating)
  } else if (sort === "discount") {
    filteredProducts.sort(
      (a, b) => (b.originalPrice - b.price) / b.originalPrice - (a.originalPrice - a.price) / a.originalPrice,
    )
  }

  // For search suggestions, return a limited set of matching products
  if (searchParams.get("suggestions") === "true") {
    const suggestions = filteredProducts.slice(0, 5).map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      image: product.image,
    }))

    return NextResponse.json({ suggestions })
  }

  // Get unique categories, brands for filters
  const categories = Array.from(new Set(products.map((product) => product.category)))
  const brands = Array.from(new Set(products.map((product) => product.brand)))
  const priceRanges = [
    { min: 0, max: 500 },
    { min: 500, max: 1000 },
    { min: 1000, max: 5000 },
    { min: 5000, max: 10000 },
    { min: 10000, max: Number.POSITIVE_INFINITY },
  ]

  return NextResponse.json({
    products: filteredProducts,
    total: filteredProducts.length,
    filters: {
      categories,
      brands,
      priceRanges,
    },
  })
}
