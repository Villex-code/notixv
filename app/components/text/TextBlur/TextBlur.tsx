"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextBlurProps {
  text: string;
  className?: string;
  animation?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  speed?: number;
}

const TextBlur = ({ text, className, animation, speed = 1 }: TextBlurProps) => {
  const defaultAnimation = {
    hidden: { filter: "blur(8px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const animationVariant = animation || defaultAnimation;

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      transition={{ duration: speed }}
      variants={animationVariant}
      className={cn(
        "font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]",
        className,
      )}
    >
      {text}
    </motion.h1>
  );
};

export default TextBlur;
