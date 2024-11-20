import { imageUrl } from "@/lib/imageUrl"
import { Product } from "@/sanity.types"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const ProductCard = ({ product }: { product: Product }) => {
  const isOutOfStock = product.stock != null && product.stock <= 0
  const imgUrl = product.image ? imageUrl(product.image).url() : ""
  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg hover:shadow-blue-200`}
    >
      <div className="flex-center relative aspect-square h-full w-full overflow-hidden p-2">
        {/* layout when out of stock */}
        {isOutOfStock && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-lg font-bold text-white">Out of Stock</span>
          </div>
        )}

        <div
          className={`${isOutOfStock ? "opacity-20" : "opacity-100"} relative h-[90%] w-[90%]`}
        >
          {product.image && (
            <Image
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              src={imgUrl}
              alt={product.name || "Product image"}
              fill
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33w"
            />
          )}
        </div>
      </div>
      <div className="w-full space-y-2 p-4">
        <h2 className="truncate text-lg font-semibold text-gray-800">
          {product.name}
        </h2>
        <p className="line-clamp-2 text-sm text-gray-600">
          {product.description
            ?.map((block) =>
              block._type === "block"
                ? block.children?.map((child) => child.text).join("")
                : "",
            )
            .join(" ") || "No description available."}
        </p>
        <h2 className="truncate text-lg font-semibold text-gray-800">
          ${product.price}
        </h2>
      </div>
    </Link>
  )
}

export default ProductCard
