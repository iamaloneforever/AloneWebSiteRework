"use client"

import { useEffect, useState } from "react"
import { FlipButton, FlipButtonFront, FlipButtonBack } from "@/components/animate-ui/primitives/buttons/flip"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { motion } from "motion/react"
import { FaGithub } from "react-icons/fa"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"
import { Spinner } from "@/components/ui/spinner"
import { FaRegFaceSadTear } from "react-icons/fa6"
type Repo = {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  language: string
}

type PinnedRepo = {
  name: string
  description: string
  url: string
  stargazerCount: number
  primaryLanguage: { name: string; color: string } | null
}

type Profile = {
  avatar_url: string
  name: string
  bio: string
  html_url: string
}

export default function GitHubStats() {
  const [data, setData] = useState<{ profile: Profile; repos: Repo[]; pinned: PinnedRepo[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  useEffect(() => {
    fetch("/api/github")
      .then(res => res.json())
      .then((json) => {
        if (json.error) throw new Error(json.error)
        setData(json)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])


  useGSAP(() => {
    if (!data || !mounted) return

    const GSplitTitle = new SplitText(".GTitle", { type: "chars" })
    const Section1Text = new SplitText(".section1text", { type: "words" })
    const Gtimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".githubsection",
        start: "top 70%",
        end: "center center",
        toggleActions: "play none none none",

      }
    })
    Gtimeline.from(GSplitTitle.chars, {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.6,
      ease: "power2.out",
    })
    Gtimeline.from(".GSection1", {
      opacity: 0,
      duration: 1,
      ease: "power2.out",

    })
    Gtimeline.from(Section1Text.words, {
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: "power2.out",
    })
    Gtimeline.from(".GSection2", {
      opacity: 0,
      duration: 2,
      ease: "power2.out",

    })

  }, [data, mounted])
  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-10">
      <Spinner className="size-15" />
      <h1 className="text-xl">Loading Please Wait :)</h1>
    </div>
  )
  if (error) return (
    <div className="h-screen flex flex-col items-center justify-center gap-10">
      <FaRegFaceSadTear size={100} />
      <h1 className="text-xl">An Error Apeared ( {error} )</h1>
    </div>

  )
  if (!data) return null



  return (
    <div className="h-screen githubsection">
      <h1 className="text-3xl GTitle text-center mb-20">My GitHub</h1>
      <div className="text-black grid grid-cols-1 gap-20 lg:grid-cols-2 ">
        <div className="flex  flex-col GSection1 items-center justify-center gap-4 border-b-2 lg:border-r-2 lg:border-b-0 p-4 ">


          <img
            src={data.profile.avatar_url}
            alt="avatar"
            width={100}
            height={100}
            className="rounded-full"
          />
          <h1 className="text-2xl section1text font-bold">{data.profile.name}</h1>
          <p className="text-zinc-400  section1text text-center font-vazir">{data.profile.bio}</p>

          <FlipButton>
            <FlipButtonFront className="w-full sm:w-52 h-10 flex items-center justify-center bg-accent text-accent-foreground text-sm font-medium">
              Visit GitHub
              <FaGithub className="ml-4" size={20} />
            </FlipButtonFront>
            <FlipButtonBack className="w-full sm:w-52 h-10 flex items-center justify-center bg-primary text-primary-foreground text-sm font-medium">
              <a href={data.profile.html_url} target="_blank" rel="noopener noreferrer">
                Go Now
              </a>
            </FlipButtonBack>
          </FlipButton>
        </div>
        <div className="flex flex-col items-center GSection2 justify-center">
          <h1 className="text-xl font-semibold">Pinned Repos</h1>
          <Swiper
            modules={[Autoplay]}
            loop={true}
            spaceBetween={20}
            speed={4000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="!w-full !p-10"
          >
            {data.pinned?.map((repo, i) => (
              <SwiperSlide key={i} >
                <motion.div className="p-4 border-2 rounded-xl"
                  whileHover={{
                    scale: 1.1, y: -10,
                    boxShadow: "10px 10px 6px rgba(0, 0, 0, 0.5)"
                  }}
                  whileTap={{
                    scale: 1.05, y: -5,
                    boxShadow: "10px 10px 6px rgba(0, 0, 0, 0.6)"
                  }}

                >
                  <a
                    href={repo.url}
                    target="_blank"
                  >
                    <h3 className="font-semibold">{repo.name}</h3>
                    <span className="text-sm text-zinc-400">
                      {repo.primaryLanguage!.name} • ⭐ {repo.stargazerCount}
                    </span>
                  </a>
                </motion.div>

              </SwiperSlide>
            ))}
          </Swiper>

          <h2 className="text-xl font-semibold mb-2">Other Repos</h2>
          <Swiper
            modules={[Autoplay]}
            loop={true}
            spaceBetween={40}
            speed={4000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="!w-full !p-10"
          >
            {data.repos.slice(0, 6).map((repo) => (
              <SwiperSlide key={repo.id} >
                <motion.div className="p-4 border-2 rounded-xl"
                  whileHover={{
                    scale: 1.1, y: -10,
                    boxShadow: "10px 10px 6px rgba(0, 0, 0, 0.5)"
                  }}
                  whileTap={{
                    scale: 1.05, y: -5,
                    boxShadow: "10px 10px 6px rgba(0, 0, 0, 0.6)"
                  }}

                >
                  <a
                    href={repo.html_url}
                    target="_blank"
                  >
                    <h3 className="font-semibold">{repo.name}</h3>
                    <span className="text-sm text-zinc-400">
                      {repo.language} • ⭐ {repo.stargazers_count}
                    </span>
                  </a>
                </motion.div>

              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </div>
  )
}
