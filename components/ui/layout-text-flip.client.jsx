"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function LayoutTextFlip({
  text = " ",
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
    <span className="inline-flex items-center gap-3">

      <span className="text-7xl font-bold">{text}</span>

      <span className="relative inline-flex overflow-hidden rounded-md  px-1 py-2 text-[#4A3728]">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-block text-7xl font-bold whitespace-nowrap"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
