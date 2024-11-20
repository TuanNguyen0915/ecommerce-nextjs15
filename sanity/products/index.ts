import { defineQuery } from "next-sanity"
import { sanityFetch } from "../lib/live"

const getAllProducts = async () => {
  const PRODUCTS_QUERY = defineQuery(`
    *[
      _type == "product"
    ] | order(_createdAt desc)
    `)
  try {
    const products = await sanityFetch({
      query: PRODUCTS_QUERY,
    })
    return products.data || []
  } catch (error) {
    console.error("Error fetching all products", error)
    return []
  }
}

const getAllCategories = async () => {
  const CATEGORIES_QUERY = defineQuery(`
    *[_tpe == "category"] | order(name asc)
    `)
  try {
    const categories = await sanityFetch({
      query: CATEGORIES_QUERY,
    })
    return categories.data || []
  } catch (error) {
    console.error("Error fetching all categories", error)
    return []
  }
}

const getSaleByCouponCode = async (couponCode: string) => {
  console.log(couponCode)
  const SALES_QUERY = defineQuery(`
    *[_type == "sale" && isActive == true &&couponCode == "${couponCode}"]
    `)
  try {
    const sales = await sanityFetch({
      query: SALES_QUERY,
    })
    return sales.data[0] || null
  } catch (error) {
    console.error("Error fetching all sales", error)
    return null
  }
}

const getProductsByName = async (searchParam: string) => {
  const PRODUCTS_QUERY = defineQuery(`
    *[_type == "product" && name match "${searchParam}*" || "${searchParam}" in categories ] | order(_createdAt desc)
    `)
  try {
    const products = await sanityFetch({
      query: PRODUCTS_QUERY,
    })
    return products.data || []
  } catch (error) {
    console.error("Error fetching all products", error)
    return []
  }
}

export {
  getAllProducts,
  getAllCategories,
  getSaleByCouponCode,
  getProductsByName,
}
