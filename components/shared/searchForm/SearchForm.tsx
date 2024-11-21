"use client"
import { Input } from "@/components/ui/input"
import Form from "next/form"
import React, { useState } from "react"
import SearchFormReset from "./SearchFormReset"
import { cn } from "@/lib/utils"

const SearchForm = ({ className }: { className?: string }) => {
  const [query, setQuery] = useState<string>("")
  console.log(query)
  const resetForm = () => {
    setQuery("")
  }
  return (
    <Form action="/search" className={`search-form flex-1 ${className}`}>
      <div className="max-4xl flex-between rounded-lg bg-gray-100">
        <Input
          placeholder="Search for products"
          name="query"
          className={cn(
            "flex-1 border-none bg-transparent shadow-none focus-within:ring-0 focus:ring-0 focus-visible:border-none focus-visible:ring-0",
          )}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && <SearchFormReset resetForm={resetForm} />}
      </div>
    </Form>
  )
}

export default SearchForm
