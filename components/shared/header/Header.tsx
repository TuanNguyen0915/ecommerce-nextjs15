"use client"
import { useUser } from "@clerk/nextjs"
import { UserResource } from "@clerk/types"
import Link from "next/link"

import DeskTopView from "./DeskTopView"
import MobileView from "./MobileView"
import SearchForm from "../searchForm/SearchForm"
import useBasketStore from "@/lib/store/store"

const Header = () => {
  const { user } = useUser()

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey()
    
    } catch (error) {
      console.error("Error: ", JSON.stringify(error, null, 2))
    }
  }

  const { items } = useBasketStore((state) => state)
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header className="flex-between flex-wrap gap-4 py-4">
      <Link
        href="/"
        className="cursor-pointer text-2xl font-bold text-primary transition-colors hover:opacity-80"
      >
        Shopper
      </Link>
      <SearchForm />
      <DeskTopView
        user={user as UserResource}
        createClerkPasskey={createClerkPasskey}
        itemCount={itemCount}
      />
      <MobileView
        user={user as UserResource}
        createClerkPasskey={createClerkPasskey}
        itemCount={itemCount}
      />
    </header>
  )
}

export default Header
