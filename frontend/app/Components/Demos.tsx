
"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const Demos = () => {
  useGSAP(() => {
    gsap.from("#Demos", {
      opacity: 0,
      y: 50,
      scrollTrigger: {
        trigger: "#Demos",
        start: "top 40%",
      }
    })
  })

  return (
    <>

      <div
        id="Demos"
        className="flex h-screen gap-10  flex-col items-center justify-center"
      >
        <h1 className="text-4xl">Demos :</h1>
        <h1 className="text-xl text-gray-800">
          Sorry There Is No Demon Yet :(
        </h1>
      </div>
    </>
  )
}

