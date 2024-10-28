"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SeparateTextProps {
  topText: string;
  bottomText: string;
  duration?: number;
  distance?: number;
  delay?: number;
  className?: string;
}

export function SeparateText({
  topText,
  bottomText,
  duration = 1.5,
  distance = 5,
  delay = 0,
  className,
}: SeparateTextProps) {
  const separateVariants = {
    hidden: {
      opacity: 0,
      y: 0,
    },
    visible: (custom: number) => ({
      opacity: 1,
      y: custom * distance,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="">
      <motion.h1
        custom={-1}
        variants={separateVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "text-center font-bold drop-shadow-sm",
          "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
          "tracking-tight",
          "leading-relaxed md:leading-relaxed lg:leading-relaxed",
          className,
        )}
      >
        {topText}
      </motion.h1>
      <motion.h1
        custom={1}
        variants={separateVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "text-center font-bold drop-shadow-sm",
          "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
          "tracking-tight",
          "leading-relaxed md:leading-relaxed lg:leading-relaxed",
          className,
        )}
      >
        {bottomText}
      </motion.h1>
    </div>
  );
}
