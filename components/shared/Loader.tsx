import React from "react"

const Loader = () => {
  return (
    <div className="flex-center h-[50vh] w-full">
      <div className="h-32 w-32 animate-spin rounded-full border-b-4 border-blue-500" />
    </div>
  )
}

export default Loader
