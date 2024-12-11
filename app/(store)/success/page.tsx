"use client"

import GreenTick from "@/components/shared/GreenTick"
import { Button } from "@/components/ui/button"
import useBasketStore from "@/lib/store/store"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

const SuccessCheckOutPage = () => {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("orderNumber")
  const clearBasket = useBasketStore((state) => state.clearBasket)
  console.log(orderNumber)
  useEffect(() => {
    if (orderNumber) {
      clearBasket()
    }
  }, [orderNumber, clearBasket])

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50">
      <div className="flex-center mx-4 mt-20 w-full max-w-2xl flex-col gap-4 rounded-xl bg-white p-12 shadow-lg">
        {/* green stick */}
        <GreenTick />
        <h1 className="text-center text-4xl font-bold">
          Thank You for Your Order!
        </h1>
        {/* ORDER NUMBER */}
        <div className="mb-6 border-b border-t border-gray-200 py-6">
          <p className="mb-4 text-lg text-gray-700">
            Your order has been confirmed and will be shipped shortly.
          </p>
          <div className="space-y-2">
            {orderNumber && (
              <p className="flex items-center space-x-5 text-gray-600">
                <span>Order Number:</span>
                <span className="font-mono text-sm text-green-600">
                  {orderNumber}
                </span>
              </p>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">
            A confirmation email has been sent to your email address.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              className="bg-green-600 transition-all hover:bg-green-700"
            >
              <Link href="/orders">View Order Details</Link>
            </Button>
            <Button asChild variant={"outline"}>
              <Link href={"/"}>Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessCheckOutPage
