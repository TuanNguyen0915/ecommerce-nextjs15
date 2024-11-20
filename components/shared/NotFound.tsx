import Form from "next/form"
import React from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import { Input } from "../ui/input"

interface INoFoundProps {
  query?: string
}

const NotFound = ({ query }: INoFoundProps) => {
  return (
    <div className="flex-center container w-full flex-col gap-4 rounded-lg bg-white p-4">
      {query ? (
        <div className="flex-center w-full flex-col space-y-4">
          <h2 className="w-full text-center text-3xl font-bold">
            No products found for <span className="text-blue-500">{query}</span>
          </h2>
          <p>Try search with different keywords</p>
          <Form action="/search" className="flex-center flex-1 md:w-4/5">
            <Input
              placeholder="Search for products"
              name="query"
              className="max-w-4xl bg-gray-100"
            />
          </Form>
          <h2 className="text-3xl font-bold">OR</h2>
        </div>
      ) : (
        <h2 className="w-full text-center text-3xl font-bold mt-10">
          No product found
        </h2>
      )}
      <Link href="/">
        <Button className="w-fit text-lg font-bold">Back to home</Button>
      </Link>
    </div>
  )
}

export default NotFound
