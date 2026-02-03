
"use client"

import { LiquidButton } from '@/components/animate-ui/primitives/buttons/liquid';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogPortal,
  DialogOverlay,
  DialogClose,
} from '@/components/animate-ui/primitives/radix/dialog';
import {
  FlipButton,
  FlipButtonBack,
  FlipButtonFront,
} from '@/components/animate-ui/primitives/buttons/flip';
import { FaTelegram } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import { useMediaQuery } from 'react-responsive';
import { motion } from 'motion/react';

gsap.registerPlugin(SplitText)
export default function Hero() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" })
  useGSAP(() => {
    const title: SplitText = new SplitText(".title", {
      type: "chars"
    })
    const des: SplitText = new SplitText(".des", {
      type: "words"
    })
    const timeline: GSAPTimeline = gsap.timeline()

    timeline.from(".box", {
      opacity: 0,
      y: 50,
      duration: 0.8,
    })
    if (!isMobile) {
      timeline.from(".Hero", {
        opacity: 0,
        y: 50,
        duration: 0.8,
      })
    }
    timeline.from(title.chars, {
      opacity: 0,
      y: -50,
      stagger: 0.05
    })
    timeline.from(des.words, {
      opacity: 0,
      stagger: 0.05
    })

  })
  return (
    <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 w-screen h-screen">
      <div className="w-full box order-2 flex justify-center items-center flex-col space-y-4">
        <h1 className="text-5xl title">Alone</h1>
        <p className="text-gray-600 des">Create Your Dreams !!</p>
        <div className='flex flex-col lg:flex-row items-center justify-center  gap-4'>

          {/* Contact Me Button with Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <LiquidButton
                className="
                  w-full sm:w-52 h-10
                  text-sm font-medium
                  flex items-center justify-center
                  overflow-hidden
                  [--liquid-button-color:var(--primary)]
                  [--liquid-button-background-color:var(--accent)]
                  text-primary hover:text-primary-foreground
                "
              >
                Contact Me
              </LiquidButton>
            </DialogTrigger>

            <DialogPortal>
              <DialogOverlay className="fixed inset-0 z-50 bg-black/80" />
              <DialogContent
                className="sm:max-w-md fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 border bg-background p-6"
              >
                <DialogHeader>
                  <DialogTitle className="text-lg">Contact Me :)</DialogTitle>
                </DialogHeader>

                <p className="py-4 text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                  quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quos.
                </p>
                <DialogFooter className='flex gap-10'>
                  <motion.div whileHover={{ scale: 1.2, rotate: 15 }}>
                    <FaTelegram size={30} color='#0088CC' />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2, rotate: -15 }}>

                    <CiMail size={30} />
                  </motion.div>
                </DialogFooter>
                <DialogClose className="absolute top-4 right-4">
                  <span className="sr-only">Close</span>
                </DialogClose>
              </DialogContent>
            </DialogPortal>
          </Dialog>

          {/* Flip Button */}
          <FlipButton>
            <FlipButtonFront
              className="
                w-full sm:w-52 h-10
                flex items-center justify-center
                bg-accent text-accent-foreground
                text-sm font-medium
              "
            >
              Demos
            </FlipButtonFront>

            <FlipButtonBack
              className="
                w-full sm:w-52 h-10
                flex items-center justify-center
                bg-primary text-primary-foreground
                text-sm font-medium
              "
            >
              Check them out Now!
            </FlipButtonBack>
          </FlipButton>

        </div>
      </div>

      <div className="w-full hidden  lg:flex items-center justify-center">
        <Image src={"/heroMountain.png"} height={30} width={300} placeholder="blur" blurDataURL="data:..." alt='Hero Image That Present A Mountain' className='Hero border-4 border-primary' />
      </div>
    </div>
  )
}
