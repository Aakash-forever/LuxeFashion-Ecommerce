"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

const LayoutTextFlip = dynamic(
  () => import("@/components/ui/layout-text-flip.client"),
  { ssr: false }
);

export default function Home() {
  const bgRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    lenis.on("scroll", ({ scroll }) => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scroll * 0.4}px)`;
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <section className="relative h-screen overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 -z-10 bg-[url('/hero-img.jpg')] bg-cover bg-center will-change-transform"
        />

        <div className="flex flex-col h-full justify-center text-slate-200 font-semibold mx-10 mt-20">
          <div>
            <p className="backdrop-blur-md rounded-xl inline-block px-2 py-1.5">
              New Collection 2026
            </p>
          </div>
          <h1 className="text-6xl font-bold text-white my-1 flex items-center">
            Designed for <LayoutTextFlip />
          </h1>
          <p className="my-3 text-xl">
            More than clothing — it’s a statement of confidence, culture, and
            individuality.
          </p>
          <div>
            <button className="bg-[#d4af37] px-6 py-4 group flex items-center gap-3 rounded-xl mt-5 text-black hover:bg-[#b8962e]">
              Shop Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                width={20}
                height={20}
                className="transition-transform group-hover:translate-x-1.5 duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12L13.5 19.5M21 12H3"
                />
              </svg>
            </button>
          </div>
           <div className=" flex justify-center text-white mt-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            width={35}
            height={35}
            className="animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v14m0 0l-5-5m5 5l5-5"
            />
          </svg>
        </div>
        </div>
      </section>

      <section className="h-screen bg-red-400 p-10">Section 1</section>
      <section className="h-screen bg-blue-400 p-10">Section 2</section>
      <section className="h-screen bg-green-400 p-10">Section 3</section>
    </>
  );
}
