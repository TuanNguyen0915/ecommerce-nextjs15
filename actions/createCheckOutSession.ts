"use server"

import { imageUrl } from "@/lib/imageUrl"
import { BasketItem } from "@/lib/store/store"
import stripe from "@/lib/stripe"

export type Metadata = {
  orderNumber: string
  customerName: string
  customerEmail: string
  clerkUserId: string
}

export type GroupedBasketItem = {
  product: BasketItem["product"]
  quantity: number
}

export const createCheckoutSession = async (
  items: GroupedBasketItem[],
  metadata: Metadata,
) => {
  try {
    const itemsWithoutPrice = items.filter((item) => !item.product.price)
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items do not have a price")
    }

    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    })

    let customerId: string | undefined
    if (customers.data.length > 0) {
      customerId = customers.data[0].id
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId ? undefined : customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product.name || "Unnamed product",
            description: `Product Id: ${item.product._id}`,
            metadata: {
              id: item.product._id,
            },
            images: item.product.image
              ? [imageUrl(item.product.image).url()]
              : [],
          },
        },
        quantity: item.quantity,
      })),
    })
    return session.url
  } catch (error) {
    console.error("Error creating checkout session", error)
  }
}
