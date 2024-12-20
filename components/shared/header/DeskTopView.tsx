import { SignInButton, UserButton } from "@clerk/nextjs"
import { UserResource } from "@clerk/types"

import Link from "next/link"
import { Button } from "../../ui/button"
import { PackageIcon, TrolleyIcon } from "@sanity/icons"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const DeskTopView = ({
  user,
  createClerkPasskey,
  itemCount,
}: {
  user: UserResource
  createClerkPasskey: () => Promise<void>
  itemCount: number
}) => {

  return (
    <div className="flex items-center justify-end space-x-2 max-md:hidden">
      <Link href="/cart">
        <Button className="relative">
          {/* TODO: span item count once global state is implemented */}
          <TrolleyIcon className="h-12 w-12" /> <span>My Cart</span>
          <div className="flex-center absolute -right-[6px] -top-3 z-10 rounded-full bg-red-500 p-1 text-xs w-5 h-5">
            {itemCount}
          </div>
        </Button>
      </Link>

      {user && (
        <Button asChild>
          <Button asChild>
            <Link href="/orders" className="mx-4">
              <PackageIcon className="h-12 w-12" /> <span>My Orders</span>
            </Link>
          </Button>
        </Button>
      )}

      {user ? (
        <div className="relative flex items-center space-x-2">
          <UserButton />
          <div className="hidden text-xs sm:block">
            <p className="text-gray-400">Welcome Back</p>
            <p className="font-bold">{user.fullName!}</p>
          </div>
          {/* CREATE A PASSKEY */}
          {user?.passkeys.length === 0 && (
            <div className="left-0 right-0 top-14 block w-fit max-lg:absolute max-lg:w-full max-lg:pr-2 max-md:hidden">
              <Button
                className={cn(
                  "w-full border border-primary hover:bg-primary hover:text-white",
                )}
                variant={"secondary"}
                onClick={createClerkPasskey}
              >
                Create a passkey
              </Button>
            </div>
          )}
        </div>
      ) : (
        <SignInButton mode="modal" />
      )}
    </div>
  )
}

export default DeskTopView
