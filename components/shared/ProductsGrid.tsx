"use client"
import { Product } from "@/sanity.types"
import React from "react"
import ProductCard from "./ProductCard"
import { AnimatePresence, motion } from "framer-motion"

interface IProductsGridProps {
  products: Product[]
}

const ProductsGrid = ({ products }: IProductsGridProps) => {
  return (
    <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products?.map((product) => (
        <AnimatePresence key={product._id}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-full justify-center"
          >
            <ProductCard product={product} />
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  )
}

export default ProductsGrid
