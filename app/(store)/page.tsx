import Banner from "@/components/shared/Banner"
import ProductsView from "@/components/shared/ProductsView"
import { Category, Product } from "@/sanity.types"
import * as SANITY_FETCH_DATA from "@/sanity/products"

export default async function Home() {
  const products = await SANITY_FETCH_DATA.getAllProducts()
  const categories = await SANITY_FETCH_DATA.getAllCategories()
  return (
    <div className="w-full flex min-h-screen flex-col items-center bg-gray-100 p-4">
      <Banner />
      <ProductsView
        products={products as Product[]}
        categories={categories as Category[]}
      />
    </div>
  )
}
