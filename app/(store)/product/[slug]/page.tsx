import React from "react"
import * as SANITY_FETCH_DATA from "@/sanity/products"
import { Product } from "@/sanity.types"
import NotFound from "@/components/shared/NotFound"
import Image from "next/image"
import { imageUrl } from "@/lib/imageUrl"
import { PortableText } from "next-sanity"
const ProductById = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const product = (await SANITY_FETCH_DATA.getProductBySlug(slug)) as Product
  if (!product) {
    return <NotFound />
  }

  const isOutOfStock = product.stock != null && product.stock <= 0
  const imgUrl = product.image ? imageUrl(product.image).url() : ""
  return (
    <div className="container mx-auto px-4 py-8 md:mt-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* PRODUCT IMAGE */}
        <div className="flex-center relative aspect-square h-full w-full overflow-hidden rounded-lg p-2">
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
        {/* PRODUCT INFO */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
            <p className="mb-4 text-xl font-semibold">
              ${product.price?.toFixed(2)}
            </p>
            <div className="prose mb-6 max-w-none">
              {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductById
