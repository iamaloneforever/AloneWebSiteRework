"use client"
import Hero from "./Components/Hero";
import Snowfall from 'react-snowfall'
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Snowfall />
      <Hero />
    </div>
  );
}
