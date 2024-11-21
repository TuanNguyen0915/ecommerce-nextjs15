import ProductsView from "@/components/shared/ProductsView"
import * as SANITY_FETCH_DATA from "@/sanity/products"

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const products = await SANITY_FETCH_DATA.getProductsByCategory(slug)
  const categories = await SANITY_FETCH_DATA.getAllCategories()

  return (
    <div className="flex min-h-screen w-full flex-col items-center space-y-4 bg-gray-100">
      <h1 className="text-3xl font-bold capitalize">
        {slug.replace("-", " ")} Collection
      </h1>
      <ProductsView products={products} categories={categories} />
    </div>
  )
}

export default CategoryPage
