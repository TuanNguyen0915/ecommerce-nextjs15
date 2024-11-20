"use client"
import { Category } from "@/sanity.types"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import { cn } from "@/lib/utils"

const CategorySelector = ({ categories }: { categories: Category[] }) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>("")
  const router = useRouter()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="capitalize">
          {value
            ? categories.find((category) => category._id === value)?.title
            : "Filter by Category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <Command>
          <CommandInput
            placeholder="Search category"
            className="h-10"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const selectedCategory = categories.find((c) =>
                  c.title
                    ?.toLowerCase()
                    .includes(e.currentTarget.value.toLowerCase()),
                )
                if (selectedCategory?.slug?.current) {
                  setValue(selectedCategory._id)
                  router.push(`/categories/${selectedCategory.slug.current}`)
                  setOpen(false)
                }
              }
            }}
          />
          <CommandList>
            <CommandEmpty>No Category found</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category._id}
                  value={category.slug?.current}
                  className={cn(
                    "ml-4 capitalize transition-all data-[selected=true]:cursor-pointer data-[selected=true]:bg-blue-200/20 data-[selected=true]:text-gray-600",
                  )}
                  onSelect={() => {
                    setValue(value === category._id ? "" : category._id)
                    router.push(`/categories/${category.slug?.current}`)
                    setOpen(false)
                  }}
                >
                  {category.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CategorySelector
