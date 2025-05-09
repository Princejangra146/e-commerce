"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to home page
      window.location.href = "/"
    }, 1500)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to home page
      window.location.href = "/"
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="hidden md:block md:w-1/2 bg-[#2874f0] p-12 text-white">
          <div className="h-full flex flex-col">
            <div>
              <h1 className="text-3xl font-bold mb-6">PrinceShopfy</h1>
              <h2 className="text-2xl font-semibold mb-4">Login / Signup</h2>
              <p className="text-blue-100 mb-8">Get access to your Orders, Wishlist and Recommendations</p>
            </div>

            <div className="mt-auto">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Login"
                width={300}
                height={300}
                className="mx-auto"
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email or mobile number</Label>
                  <Input id="email" type="text" placeholder="Enter Email or Mobile number" required />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-[#2874f0] hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" placeholder="Enter Password" required />
                </div>

                <div className="text-sm text-gray-600">
                  By continuing, you agree to PrinceShopfy's{" "}
                  <Link href="/terms" className="text-[#2874f0] hover:underline">
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#2874f0] hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Image
                    src="/placeholder.svg?height=20&width=20"
                    alt="Google"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Continue with Google
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input id="fullname" type="text" placeholder="Enter your name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="Enter email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input id="mobile" type="tel" placeholder="Enter mobile number" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" placeholder="Create password" required />
                </div>

                <div className="text-sm text-gray-600">
                  By continuing, you agree to PrinceShopfy's{" "}
                  <Link href="/terms" className="text-[#2874f0] hover:underline">
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#2874f0] hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
