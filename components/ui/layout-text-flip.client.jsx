"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function LayoutTextFlip({
  text = "",
  words = ["YOU", "COMFORT", "STYLE", "MOVEMENT", "LIFE"],
  duration = 2000,
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(id);
  }, [duration, words.length]);

  return (
    <span className="inline-flex items-center gap-2">
      {text && (
        <span className="font-bold leading-tight text-2xl sm:text-4xl lg:text-7xl">
          {text}
        </span>
      )}

      <span className="relative inline-flex overflow-hidden rounded-md px-1 py-1 text-[#4A3728]">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="
              inline-block font-bold whitespace-nowrap leading-tight
              text-3xl sm:text-5xl lg:text-7xl
              min-w-[7ch] sm:min-w-[9ch] lg:min-w-[11ch]
            "
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
