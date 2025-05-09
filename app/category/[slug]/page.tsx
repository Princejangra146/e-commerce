"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const { slug } = params

  useEffect(() => {
    // Redirect to products page with category filter
    router.push(`/products?category=${slug}`)
  }, [router, slug])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2874f0]"></div>
    </div>
  )
}
