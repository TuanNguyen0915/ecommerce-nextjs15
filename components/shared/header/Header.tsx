"use client"
import { useUser } from "@clerk/nextjs"
import { UserResource } from "@clerk/types"
import Link from "next/link"
import Form from "next/form"
import { Input } from "../../ui/input"

import DeskTopView from "./DeskTopView"
import MobileView from "./MobileView"

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
      <Form action="/search" className="flex-1">
        <Input
          placeholder="Search for products"
          name="query"
          className="max-w-4xl bg-gray-100"
        />
      </Form>
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
