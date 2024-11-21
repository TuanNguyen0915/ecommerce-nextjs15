
import React from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import SearchForm from "./searchForm/SearchForm"

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
          <SearchForm className="w-4/5"/>
          <h2 className="text-3xl font-bold">OR</h2>
        </div>
      ) : (
        <h2 className="mt-10 w-full text-center text-3xl font-bold">
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
