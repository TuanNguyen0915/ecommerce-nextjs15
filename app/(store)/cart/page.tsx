"use client"

import { createCheckoutSession, Metadata } from "@/actions/createCheckOutSession"
import AddToBasketButton from "@/components/shared/AddToBasketButton"
import Loader from "@/components/shared/Loader"
import { Button } from "@/components/ui/button"
import { imageUrl } from "@/lib/imageUrl"
import useBasketStore from "@/lib/store/store"
import { SignInButton, useAuth, useUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const CartPage = () => {
  const groupItems = useBasketStore((state) => state.getGroupedItems())
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  // const router = useRouter()

  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <Loader />
  }

  if (groupItems.length === 0) {
    return (
      <div className="flex-center container mx-auto min-h-[50vh] flex-col p-4">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Your Cart</h1>
        <p className="text-lg text-gray-600">Your cart is empty</p>
      </div>
    )
  }

  const handleCheckOut = async () => {
    if (!isSignedIn) return
    setIsLoading(true)
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      }
      const checkoutUrl = await createCheckoutSession(groupItems, metadata)
      
      if (checkoutUrl) {
        window.location.href = checkoutUrl
      }
    } catch (error) {
      console.error("Error creating checkout session", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-center container mx-auto min-h-[50vh] flex-col p-4">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Your Cart</h1>
      <div className="flex w-full flex-col gap-2 lg:flex-row">
        {/* ITEM GROUP */}
        <div className="flex-grow">
          {groupItems.map((item) => (
            <div
              key={item.product._id}
              className="flex-between mb-4 gap-8 overflow-hidden rounded border p-4"
            >
              <Link
                href={`/product/${item.product.slug?.current}`}
                className="group flex flex-1 items-center gap-8 transition-all hover:translate-x-2"
              >
                <div className="relative h-20 w-20 flex-shrink-0 sm:h-24 sm:w-24">
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name ?? "Product image"}
                      className="object-contain"
                      fill
                    />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="line-clamp-1 font-semibold group-hover:text-blue-500">
                    {item.product.name}
                  </p>
                  <p>Price: ${item.product.price}</p>
                </div>
              </Link>
              <div className="flex flex-shrink-0 items-center">
                <AddToBasketButton product={item.product} />
              </div>
            </div>
          ))}
        </div>
        {/* ORDER SUMMARY */}
        <div className="fixed bottom-0 left-0 order-first h-fit w-full space-y-4 rounded border bg-white p-5 lg:sticky lg:left-auto lg:top-4 lg:order-last lg:w-1/3">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          <div className="mt-4 space-y-2">
            <p className="flex-between">
              <span>Items:</span>
              <span>
                {groupItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </p>
            <p className="flex-between border-t pt-2 text-2xl font-bold">
              <span>Total: </span>
              <span>
                ${useBasketStore.getState().getTotalPrice().toFixed(2)}
              </span>
            </p>
          </div>
          {isSignedIn ? (
            <Button
              className="w-full disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-white"
              onClick={handleCheckOut}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Checkout"}
            </Button>
          ) : (
            <SignInButton mode="modal">
              <Button className="w-full">Sign in to Checkout</Button>
            </SignInButton>
          )}
        </div>
        {/* EMPTY SPACE FOR CHECKOUT BUTTON AT MOBILE VIEW */}
        <div className="h-64 lg:h-0" />
      </div>
    </div>
  )
}

export default CartPage
