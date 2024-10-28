"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggeredWordsProps {
  text: string;
  delay?: number;
  containerAnimation?: Variants;
  wordAnimation?: Variants;
  className?: string;
}

export function StaggeredWords({
  text,
  containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
  wordAnimation = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },
  className,
}: StaggeredWordsProps) {
  return (
    <motion.h1
      variants={containerAnimation}
      initial="hidden"
      animate="show"
      className={cn(
        "font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm",
        className,
      )}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          variants={wordAnimation}
          style={{ display: "inline-block", paddingRight: "8px" }}
        >
          {word === "" ? <span>&nbsp;</span> : word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default StaggeredWords;
