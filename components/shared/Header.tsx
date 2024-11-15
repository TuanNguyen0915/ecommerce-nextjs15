"use client"
import {
  useUser,
  SignInButton,
  ClerkLoaded,
  UserButton,
  SignOutButton,
} from "@clerk/nextjs"
import Link from "next/link"
import Form from "next/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { PackageIcon, TrolleyIcon } from "@sanity/icons"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Menu } from "lucide-react"

const Header = () => {
  const { user } = useUser()
  console.log(user)
  return (
    <header className="flex-between flex-wrap gap-4 py-4">
      <Link
        href="/"
        className="cursor-pointer text-2xl font-bold text-primary transition-colors hover:opacity-80"
      >
        Shopper
      </Link>
      {/* DESKTOP VIEW */}
      <div className="flex-between flex-1 gap-2 max-md:hidden">
        <Form action="/search" className="flex-1">
          <Input
            placeholder="Search for products"
            name="query"
            className="max-w-4xl bg-gray-100"
          />
        </Form>
        <div className="flex items-center">
          <Button asChild>
            <Link href="/cart">
              {/* TODO: span item count once global state is implemented */}
              <TrolleyIcon className="h-12 w-12" /> <span>My Cart</span>
            </Link>
          </Button>
          <ClerkLoaded>
            <div className="flex items-center">
              {user && (
                <Button asChild>
                  <Button asChild>
                    <Link href="/orders" className="mx-4">
                      <PackageIcon className="h-12 w-12" />{" "}
                      <span>My Orders</span>
                    </Link>
                  </Button>
                </Button>
              )}

              {user ? (
                <div className="flex items-center space-x-2">
                  <UserButton />
                  <div className="hidden text-xs sm:block">
                    <p className="text-gray-400">Welcome Back</p>
                    <p className="font-bold">{user.fullName!}</p>
                  </div>
                </div>
              ) : (
                <SignInButton mode="modal" />
              )}
            </div>
          </ClerkLoaded>
        </div>
      </div>
      {/* MOBILE VIEW */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="h-8 w-8" />
          </SheetTrigger>
          <SheetContent className="flex flex-col justify-between">
            <SheetTitle className="flex-center mt-10 gap-2">
              {user && <UserButton />}
              <div className="text-sm">
                <p className="text-gray-400">Welcome Back</p>
                <p className="font-bold">{user ? user.fullName : "Guest!"}</p>
              </div>
            </SheetTitle>
            <div className="mt-20 w-full flex-1">
              <div className="flex-between w-full gap-2">
                <Button asChild className="w-full">
                  <Link href="/cart">
                    {/* TODO: span item count once global state is implemented */}
                    <TrolleyIcon className="h-12 w-12" /> <span>My Cart</span>
                  </Link>
                </Button>
                <Button asChild>
                  <Button asChild>
                    <Link href={user ? "/orders" : "/sign-in"} className="mx-4">
                      <PackageIcon className="h-12 w-12" />{" "}
                      <span>My Orders</span>
                    </Link>
                  </Button>
                </Button>
              </div>
            </div>
            <div className="w-full">
              {user ? (
                <Button asChild className="w-full">
                  <SignOutButton />
                </Button>
              ) : (
                <Button asChild className="w-full">
                  <SignInButton mode="modal" />
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Header
