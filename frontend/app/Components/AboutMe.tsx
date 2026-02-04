import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Image from "next/image"
import { motion, useAnimationControls } from "motion/react"
import { SplitText } from "gsap/all"

export const AboutMe = () => {
  const controls = useAnimationControls()
  useGSAP(() => {
    const textsplited = new SplitText(".text", {
      type: "words"
    })
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section",
        start: "top 70%",
        end: "center center",
        toggleActions: "play none none none",
      },
    })

    tl.from(textsplited.words, {
      opacity: 0,
      stagger: 0.06,
    })
    tl.from(
      ".image",
      {
        opacity: 0,
        x: 150,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.6"
    )
  })

  return (
    <div className="section flex items-center h-screen w-screen">
      <div className="grid gap-10 lg:grid-cols-2">



        <motion.div
          className="flex lg:order-2  justify-center"
          animate={controls}
          onHoverStart={async () => {
            await controls.start({
              x: [0, 20, 0],
              y: [0, -15, 0],
              rotate: [0, 6, 0],
              transition: { duration: 1, ease: "easeOut", repeat: Infinity },
            })
          }}
          onHoverEnd={() => {
            controls.start({
              x: 0,
              y: 0,
              rotate: 0,
              transition: { duration: 0.5, ease: "easeInOut" },
            })
          }}
        >
          <Image
            src="/Code.jpg"
            alt="A Code Image"
            width={200}
            height={200}
            className="image"
          />
        </motion.div>
        <div className="flex   justify-center items-center">
          <motion.h1 whileHover={{ scale: 1.1, rotate: -3, color: "#030303" }} transition={{ duration: 0.5 }} className="text-gray-600 px-10 text text-xl">
            Hello Guys I am <span className="font-semibold"> Alone </span>
            A FullStack Developer from Iran, my Stack is
            <span className=" font-bold"> REACT </span>,
            <span className=" font-bold"> SQL </span>,
            <span className=" font-bold"> NodeJS </span>,
            <span className=" font-bold"> NoSql </span>,
            <span className=" font-bold"> Docker </span>,
            <span className=" font-bold"> Jenkins </span>
          </motion.h1>
        </div>

      </div>

    </div>
  )
}

