
"use client"
import Hero from "./Components/Hero";
import Snowfall from 'react-snowfall'
import { AboutMe } from "./Components/AboutMe";
import { Demos } from "./Components/Demos";
import { ScrollToPlugin, ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import Skills from "./Components/Skills";
import GitHubStats from "./Components/GitHubStats";
gsap.registerPlugin(SplitText, ScrollToPlugin, ScrollTrigger)
export default function Home() {
  return (
    <div className="relative min-h-screen w-screen bg-zinc-50 dark:bg-black font-sans overflow-hidden">

      {/* Snowfall full screen */}
      <Snowfall
        style={{
          position: "fixed", // روی کل صفحه
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none", // اجازه کلیک روی المان‌ها
          zIndex: 50, // بالاتر از بک‌گراند ولی زیر محتوا
        }}
        snowflakeCount={200} // تعداد برف‌ها
      />

      {/* محتوا */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <Hero />
        <AboutMe />
        <Skills />
        <Demos />
        <GitHubStats />
      </div>

    </div>
  );
}

