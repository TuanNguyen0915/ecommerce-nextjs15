"use client"
import useBasketStore from "@/lib/store/store"
import { Product } from "@/sanity.types"
import { useEffect, useState } from "react"

interface IAddToBasketButtonProps {
  product: Product
  disable?: boolean
}

const AddToBasketButton = ({ product, disable }: IAddToBasketButtonProps) => {
  const { addItem, removeItem, getItemCount } = useBasketStore((state) => state)
  const itemCount = getItemCount(product._id)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  if (!isClient) {
    return null
  }
  return (
    <div className="flex-center space-x-2">
      {/* remove button */}
      <button
        onClick={() => {
          removeItem(product._id)
        }}
        className={`flex-center h-8 w-8 rounded-full transition-colors duration-200 ${itemCount === 0 ? "cursor-not-allowed bg-gray-100" : "bg-gray-200 hover:bg-red-300"}`}
        disabled={itemCount === 0 || disable}
      >
        <span
          className={`text-xl font-bold ${itemCount === 0 ? "text-gray-400" : "text-gray-600"}`}
        >
          -
        </span>
      </button>
      {/* item count */}
      <span className="w-8 text-center font-semibold">{itemCount}</span>
      {/* add button */}
      <button
        onClick={() => addItem(product)}
        className={`flex-center h-8 w-8 rounded-full transition-colors duration-200 ${disable ? "cursor-not-allowed bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
        disabled={disable}
      >
        <span className="text-xl font-bold text-white">+</span>
      </button>
    </div>
  )
}

export default AddToBasketButton
