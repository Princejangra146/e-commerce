import Link from "next/link"
import Image from "next/image"

// Mock data for categories
const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "/placeholder.svg?height=300&width=300",
    subcategories: ["Mobiles", "Laptops", "Cameras", "Accessories"],
  },
  {
    id: 2,
    name: "Fashion",
    image: "/placeholder.svg?height=300&width=300",
    subcategories: ["Men's Clothing", "Women's Clothing", "Footwear", "Watches"],
  },
  {
    id: 3,
    name: "Home & Furniture",
    image: "/placeholder.svg?height=300&width=300",
    subcategories: ["Kitchen", "Living Room", "Bedroom", "Decor"],
  },
  {
    id: 4,
    name: "Appliances",
    image: "/placeholder.svg?height=300&width=300",
    subcategories: ["TV", "Washing Machines", "Refrigerators", "Air Conditioners"],
  },
]

export default function CategorySection() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
              <Link href={`/products?category=${category.name}`}>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <h3 className="text-white text-xl font-bold p-4">{category.name}</h3>
                  </div>
                </div>
              </Link>

              <div className="p-4">
                <ul className="space-y-2">
                  {category.subcategories.map((subcat, index) => (
                    <li key={index}>
                      <Link
                        href={`/products?category=${subcat}`}
                        className="text-gray-700 hover:text-[#2874f0] transition-colors"
                      >
                        {subcat}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/products?category=${category.name}`}
                  className="inline-block mt-4 text-[#2874f0] hover:underline"
                >
                  View All
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
