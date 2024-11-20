import { Sale } from "@/sanity.types"
import * as SANITY_FETCH_DATA from "@/sanity/products"

const Banner = async () => {
  const sale = (await SANITY_FETCH_DATA.getSaleByCouponCode("BFRIDAY")) as Sale
  if (!sale?.isActive) return null

  return (
    <div className="mx-4 my-2 w-full rounded-lg bg-gradient-to-r from-red-600 to-black px-6 py-10 text-white shadow-lg">
      <div className="space-y-6">
        <h2 className="text-5xl font-bold max-md:text-3xl">{sale.title}</h2>
        <h3 className="text-3xl font-bold max-md:text-xl">
          {sale.description}
        </h3>
        <div className="w-fit rounded-full bg-white px-8 py-4 text-black">
          <h2 className="text-xl font-bold">
            Use Code: <span className="text-red-600">{sale.couponCode}</span>{" "}
            for {sale.discountAmount}% OFF
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Banner
