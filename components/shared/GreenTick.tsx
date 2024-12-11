import React from "react"

const GreenTick = () => {
  return (
    <div className="flex-center h-16 w-16 rounded-full bg-green-100">
      <svg
        className="h-8 w-8 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  )
}

export default GreenTick