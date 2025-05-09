"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronRight, CreditCard, Truck, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// Mock cart data
const cartItems = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    image: "/placeholder.svg?height=80&width=80",
    price: 1999,
    quantity: 1,
    color: "Black",
  },
  {
    id: 2,
    name: "Men's Casual T-Shirt",
    image: "/placeholder.svg?height=80&width=80",
    price: 499,
    quantity: 2,
    color: "Blue",
    size: "L",
  },
]

// Mock addresses
const addresses = [
  {
    id: 1,
    name: "John Doe",
    line1: "123 Main Street",
    line2: "Apartment 4B",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    phone: "9876543210",
    isDefault: true,
  },
  {
    id: 2,
    name: "John Doe",
    line1: "456 Park Avenue",
    line2: "Floor 3",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
    phone: "9876543210",
    isDefault: false,
  },
]

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [selectedAddress, setSelectedAddress] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("card")

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryCharge = subtotal > 1000 ? 0 : 40
  const total = subtotal + deliveryCharge

  const goToNextStep = () => {
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const goToPreviousStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const placeOrder = () => {
    // Simulate order placement
    setTimeout(() => {
      window.location.href = "/order-confirmation"
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center w-full max-w-3xl justify-between">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-[#2874f0] text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > 1 ? <Check className="h-5 w-5" /> : 1}
              </div>
              <span className="text-sm mt-1">Address</span>
            </div>

            <div className="flex-1 h-1 mx-2 bg-gray-200">
              <div className={`h-full ${step >= 2 ? "bg-[#2874f0]" : "bg-gray-200"}`} style={{ width: "100%" }}></div>
            </div>

            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 2 ? "bg-[#2874f0] text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > 2 ? <Check className="h-5 w-5" /> : 2}
              </div>
              <span className="text-sm mt-1">Payment</span>
            </div>

            <div className="flex-1 h-1 mx-2 bg-gray-200">
              <div className={`h-full ${step >= 3 ? "bg-[#2874f0]" : "bg-gray-200"}`} style={{ width: "100%" }}></div>
            </div>

            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 3 ? "bg-[#2874f0] text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                3
              </div>
              <span className="text-sm mt-1">Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Select Delivery Address</h2>

                <RadioGroup
                  value={String(selectedAddress)}
                  onValueChange={(value) => setSelectedAddress(Number(value))}
                >
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="flex items-start">
                        <RadioGroupItem value={String(address.id)} id={`address-${address.id}`} className="mt-1" />
                        <div className="ml-3 border border-gray-200 rounded-lg p-4 flex-1">
                          <Label htmlFor={`address-${address.id}`} className="font-medium flex items-center">
                            {address.name}
                            {address.isDefault && (
                              <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                Default
                              </span>
                            )}
                          </Label>
                          <div className="text-sm text-gray-600 mt-1">
                            <p>{address.line1}</p>
                            {address.line2 && <p>{address.line2}</p>}
                            <p>
                              {address.city}, {address.state} - {address.pincode}
                            </p>
                            <p className="mt-1">Phone: {address.phone}</p>
                          </div>
                          <div className="mt-3 flex gap-3">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            {!address.isDefault && (
                              <Button variant="outline" size="sm">
                                Set as Default
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="mt-6 border-t pt-6">
                  <Button variant="outline" className="flex items-center gap-2">
                    <span>Add New Address</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button onClick={goToNextStep}>Deliver to this Address</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Payment Options</h2>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-start">
                    <RadioGroupItem value="card" id="payment-card" className="mt-1" />
                    <div className="ml-3 flex-1">
                      <Label htmlFor="payment-card" className="font-medium flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Credit / Debit Card
                      </Label>

                      {paymentMethod === "card" && (
                        <div className="mt-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input id="card-number" placeholder="1234 5678 9012 3456" />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input id="expiry" placeholder="MM/YY" />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="name-on-card">Name on Card</Label>
                            <Input id="name-on-card" placeholder="John Doe" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <RadioGroupItem value="upi" id="payment-upi" className="mt-1" />
                    <div className="ml-3 flex-1">
                      <Label htmlFor="payment-upi" className="font-medium">
                        UPI
                      </Label>

                      {paymentMethod === "upi" && (
                        <div className="mt-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="upi-id">UPI ID</Label>
                            <Input id="upi-id" placeholder="yourname@upi" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <RadioGroupItem value="cod" id="payment-cod" className="mt-1" />
                    <div className="ml-3 flex-1">
                      <Label htmlFor="payment-cod" className="font-medium">
                        Cash on Delivery
                      </Label>

                      {paymentMethod === "cod" && (
                        <div className="mt-2 text-sm text-gray-600">
                          <p>Pay when your order is delivered.</p>
                          <p className="mt-1">Additional fee of ₹40 will be charged for Cash on Delivery.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </RadioGroup>

                <div className="mt-8 flex justify-between">
                  <Button variant="outline" onClick={goToPreviousStep}>
                    Back
                  </Button>
                  <Button onClick={goToNextStep}>Continue</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Review Your Order</h2>

                <div className="border-b pb-4 mb-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Delivery Address
                  </h3>

                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{addresses[0].name}</p>
                    <p>{addresses[0].line1}</p>
                    {addresses[0].line2 && <p>{addresses[0].line2}</p>}
                    <p>
                      {addresses[0].city}, {addresses[0].state} - {addresses[0].pincode}
                    </p>
                    <p className="mt-1">Phone: {addresses[0].phone}</p>
                  </div>
                </div>

                <div className="border-b pb-4 mb-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Method
                  </h3>

                  <div className="text-sm text-gray-600">
                    {paymentMethod === "card" && <p>Credit / Debit Card</p>}
                    {paymentMethod === "upi" && <p>UPI</p>}
                    {paymentMethod === "cod" && <p>Cash on Delivery</p>}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Order Items</h3>

                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="flex-1">
                          <h4 className="font-medium line-clamp-1">{item.name}</h4>
                          <div className="text-sm text-gray-500 mt-1">
                            {item.color && <span>Color: {item.color}</span>}
                            {item.size && <span className="ml-2">Size: {item.size}</span>}
                          </div>
                          <div className="flex justify-between mt-2">
                            <span>Qty: {item.quantity}</span>
                            <span className="font-medium">₹{item.price * item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button variant="outline" onClick={goToPreviousStep}>
                    Back
                  </Button>
                  <Button onClick={placeOrder}>Place Order</Button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-medium pb-4 border-b">Price Details</h2>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price ({cartItems.length} items)</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Charges</span>
                  {deliveryCharge === 0 ? <span className="text-green-600">FREE</span> : <span>₹{deliveryCharge}</span>}
                </div>

                {paymentMethod === "cod" && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cash on Delivery Fee</span>
                    <span>₹40</span>
                  </div>
                )}

                <div className="flex justify-between pt-3 border-t font-bold">
                  <span>Total Amount</span>
                  <span>₹{total + (paymentMethod === "cod" ? 40 : 0)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
              <h2 className="text-lg font-medium mb-4">Have a Coupon?</h2>

              <div className="flex">
                <Input placeholder="Enter coupon code" className="rounded-r-none" />
                <Button variant="secondary" className="rounded-l-none">
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
