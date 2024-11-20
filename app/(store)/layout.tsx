import Banner from "@/components/shared/Banner"
import Header from "@/components/shared/header/Header"
import React from "react"

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto min-h-screen max-w-[1440px] px-2">
      <Header />
      <Banner />
      {children}
    </main>
  )
}

export default StoreLayout
