"use client"
import { useUser } from "@clerk/nextjs"
import { UserResource } from "@clerk/types"
import Link from "next/link"

import DeskTopView from "./DeskTopView"
import MobileView from "./MobileView"
import SearchForm from "../searchForm/SearchForm"


const Header = () => {
  const { user } = useUser()

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey()
      console.log(response)
    } catch (error) {
      console.error("Error: ", JSON.stringify(error, null, 2))
    }
  }

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
      />
      <MobileView
        user={user as UserResource}
        createClerkPasskey={createClerkPasskey}
      />
    </header>
  )
}

export default Header
