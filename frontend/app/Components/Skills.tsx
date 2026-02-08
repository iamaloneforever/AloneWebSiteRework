import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import { SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiNodedotjs, SiExpress, SiGraphql, SiJsonwebtokens, SiMongodb, SiGit, SiDocker, SiLinux, SiVim, SiFigma, SiPostgresql, SiRedis, SiMysql } from "react-icons/si"
import { JSX } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"
import { motion } from "motion/react"

type SkillCategory = {
  name: string,
  skills: { name: string, icon: JSX.Element }[]
}

export default function Skills() {
  const categories: SkillCategory[] = [
    {
      name: "Frontend",
      skills: [
        { name: "React", icon: <SiReact size={40} /> },
        { name: "Next.js", icon: <SiNextdotjs size={40} /> },
        { name: "Tailwind", icon: <SiTailwindcss size={40} /> },
        { name: "Framer Motion", icon: <SiFramer size={40} /> },
        { name: "GSAP", icon: <></> }
      ]
    },
    {
      name: "Backend",
      skills: [
        { name: "Node.js", icon: <SiNodedotjs size={40} /> },
        { name: "Express", icon: <SiExpress size={40} /> },
        { name: "GraphQL", icon: <SiGraphql size={40} /> },
        { name: "JWT", icon: <SiJsonwebtokens size={40} /> },
        { name: "MongoDB", icon: <SiMongodb size={40} /> }
      ]
    },
    {
      name: "Tools",
      skills: [
        { name: "Git", icon: <SiGit size={40} /> },
        { name: "Docker", icon: <SiDocker size={40} /> },
        { name: "Linux", icon: <SiLinux size={40} /> },
        { name: "Vim", icon: <SiVim size={40} /> },
        { name: "Figma", icon: <SiFigma size={40} /> }
      ]
    },
    {
      name: "Databases",
      skills: [
        { name: "MongoDB", icon: <SiMongodb size={40} /> },
        { name: "PostgreSQL", icon: <SiPostgresql size={40} /> },
        { name: "Redis", icon: <SiRedis size={40} /> },
        { name: "MySQL", icon: <SiMysql size={40} /> }
      ]
    }
  ]
  useGSAP(() => {
    const SplitedText = new SplitText('.techswiperHeader', { type: "chars" })
    const TechTimeline: GSAPTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".techsection",
        start: "top 70%",
        end: "center center",
        toggleActions: "play none none none",

      }
    })
    TechTimeline.from(SplitedText.chars, {
      opacity: 0,
      y: 20,
      delay: 0.5,
      stagger: 0.05
    })
    TechTimeline.from(".techswiperBody", {
      opacity: 0,
      y: 20,
      delay: 0.5,
      stagger: 0.5

    })
  })
  return (
    <div className="w-full techsection max-w-6xl overflow-hidden space-y-20">
      {categories.map((cat) => (
        <div key={cat.name} >
          <h1 className="text-3xl techswiperHeader  mb-10 text-center">{cat.name}</h1>

          <Swiper
            modules={[Autoplay]}
            loop={true}
            spaceBetween={50}
            speed={4000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3 },
            }}
            className="techswiperBody !p-10 "
          >
            {cat.skills.map((skill) => (
              <SwiperSlide
                key={skill.name}
              >

                <motion.div
                  whileHover={{
                    scale: 1.1, y: -20,
                    boxShadow: "10px 10px 6px rgba(0, 0, 0, 0.5)"
                  }}
                  whileTap={{
                    scale: 1.05, y: -10,
                    boxShadow: "10px 10px 6px rgba(0, 0, 0, 0.6)"
                  }}
                  className="flex gap-10 border-2 p-10 rounded-xl items-center justify-center">

                  {skill.icon}
                  <span className="font-semibold text-xl">{skill.name}</span>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  )
}
