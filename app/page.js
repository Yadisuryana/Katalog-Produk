"use client";

import Navbar from "@/app/components/navbar/page";
import About from "@/app/components/about/page";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <About />
    </div>
  );
}
