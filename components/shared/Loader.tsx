"use client"
import { PropagateLoader } from "react-spinners"
const Loader = () => {
  return (
    <div className="flex-center h-[500px] w-full">
      <PropagateLoader color="blue" size={15} />
    </div>
  )
}

export default Loader
