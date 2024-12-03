import { Product } from "@/sanity.types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface BasketItem {
  product: Product
  quantity: number
}

interface BasketState {
  items: BasketItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearBasket: () => void
  getTotalPrice: () => number
  getItemCount: (productId: string) => number
  getGroupedItems: () => BasketItem[]
}

const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],
      // add item to basket
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id,
          )
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            }
          } else {
            return {
              items: [...state.items, { product, quantity: 1 }],
            }
          }
        }),
      // remove item from basket
      removeItem: (productId: string) =>
        set((state) => {
          return {
            items: state.items.reduce((acc, item) => {
              if (item.product._id === productId) {
                if (item.quantity > 1) {
                  acc.push({ ...item, quantity: item.quantity - 1 })
                }
              } else {
                acc.push(item)
              }
              return acc
            }, [] as BasketItem[]),
          }
        }),
      // clear basket
      clearBasket: () => set({ items: [] }),
      // get total price
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0,
        )
      },
      // get item count
      getItemCount: (productId) => {
        return (
          get().items.find((item) => item.product._id === productId)
            ?.quantity ?? 0
        )
      },
      // get group items
      getGroupedItems: () => get().items,
    }),
    {
      name: "basket-store",
    },
  ),
)

export default useBasketStore
