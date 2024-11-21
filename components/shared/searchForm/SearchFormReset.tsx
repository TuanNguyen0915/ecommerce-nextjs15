"use client"
import { X } from "lucide-react"
import Link from "next/link"
import React from "react"

const SearchFormReset = ({ resetForm }: { resetForm: () => void }) => {
  return (
    <div
      className="flex-center h-12 w-12 cursor-pointer"
      onClick={() => resetForm()}
    >
      <Link href={"/"}>
        <X className="transition-all hover:scale-125 hover:text-blue-500" />
      </Link>
    </div>
  )
}

export default SearchFormReset
