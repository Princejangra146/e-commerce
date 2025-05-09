"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SubcategoryPage({
  params,
}: {
  params: { slug: string; subcategory: string }
}) {
  const router = useRouter()
  const { subcategory } = params

  useEffect(() => {
    // Redirect to products page with subcategory filter
    router.push(`/products?category=${subcategory}`)
  }, [router, subcategory])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2874f0]"></div>
    </div>
  )
}
