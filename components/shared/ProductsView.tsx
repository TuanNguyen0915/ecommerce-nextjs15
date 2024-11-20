import { Category, Product } from "@/sanity.types"
import React from "react"
import ProductsGrid from "./ProductsGrid"

interface IProductsViewProps {
  products: Product[]
  categories?: Category[]
}

const ProductsView = ({ products, categories }: IProductsViewProps) => {
  console.log(categories)
  return (
    <div className="flex w-full flex-col p-4">
      {/* CATEGORIES */}
      <div className="w-full sm:w-[200px]">
        {/* TODO: CategorySelectorComponent will be here */}
      </div>
      <div className="flex-1">
        <div>
          <ProductsGrid products={products} />
          <hr className="mt-4 w-1/2 sm:w-3/4" />
        </div>
      </div>
    </div>
  )
}

export default ProductsView
