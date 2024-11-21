import Loader from "@/components/shared/Loader"
import ProductsView from "@/components/shared/ProductsView"
import { Category, Product } from "@/sanity.types"
import * as SANITY_FETCH_DATA from "@/sanity/products"

export default async function Home() {
  const products = await SANITY_FETCH_DATA.getAllProducts()
  const categories = await SANITY_FETCH_DATA.getAllCategories()

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-100">
      <ProductsView
        products={products as Product[]}
        categories={categories as Category[]}
      />
    </div>
  )
}
