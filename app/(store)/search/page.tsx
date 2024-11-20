import React from "react"
import * as SANITY_FETCH_DATA from "@/sanity/products"
import Banner from "@/components/shared/Banner"
import { Product } from "@/sanity.types"
import ProductsView from "@/components/shared/ProductsView"
import NoFound from "@/components/shared/NoFound"
const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query: string }
}) => {
  const { query } = await searchParams
  const products = await SANITY_FETCH_DATA.getProductsByName(query)

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-100 p-4">
      {products.length === 0 ? (
        <NoFound query={query} />
      ) : (
        <>
          <Banner />
          <ProductsView products={products as Product[]} />
        </>
      )}
    </div>
  )
}

export default SearchPage
