import { SignInButton, UserButton, SignOutButton } from "@clerk/nextjs"
import { UserResource } from "@clerk/types"
import Link from "next/link"
import { Button } from "../../ui/button"
import { PackageIcon, TrolleyIcon } from "@sanity/icons"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

const MobileView = ({
  user,
  createClerkPasskey,
  itemCount,
}: {
  user: UserResource
  createClerkPasskey: () => Promise<void>
  itemCount: number
}) => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Menu className="h-8 w-8" />
        </SheetTrigger>
        <SheetContent className="flex flex-col justify-between">
          <SheetTitle className="mt-10 gap-2 space-y-4">
            <div className="flex-center w-full gap-2">
              {user && <UserButton />}
              <div className="text-sm">
                <p className="text-gray-400">Welcome Back</p>
                <p className="font-bold">{user ? user.fullName : "Guest!"}</p>
              </div>
            </div>
            {user?.passkeys.length === 0 && (
              <Button
                className={cn(
                  "w-full border border-primary hover:bg-primary hover:text-white",
                )}
                variant={"secondary"}
                onClick={createClerkPasskey}
              >
                Create a passkey
              </Button>
            )}
          </SheetTitle>
          <div className="mt-20 w-full flex-1">
            <div className="flex-between w-full gap-2">
              <Button asChild className="flex-1">
                <Link href="/cart" className="relative">
                  {/* TODO: span item count once global state is implemented */}
                  <TrolleyIcon className="h-12 w-12" /> <span>My Cart</span>
                  <div className="flex-center absolute -right-[6px] -top-2 z-10 h-5 w-5 rounded-full bg-red-500 p-1 text-xs">
                    {itemCount}
                  </div>
                </Link>
              </Button>
              <Button asChild className="flex-1">
                <Button asChild>
                  <Link href={user ? "/orders" : "/sign-in"} className="mx-4">
                    <PackageIcon className="h-12 w-12" /> <span>My Orders</span>
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
              <Button className="w-full">
                <SignInButton mode="modal" />
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileView
