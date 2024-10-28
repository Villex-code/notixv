"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SlideInTextProps {
  firstText: string;
  secondText: string;
  direction?: "horizontal" | "vertical";
  duration?: number;
  blur?: boolean;
  blurAmount?: number;
  className?: string;
}

export function SlideInText({
  firstText,
  secondText,
  direction = "horizontal",
  duration = 1,
  blur = false,
  blurAmount = 10,
  className,
}: SlideInTextProps) {
  const getVariants = (side: "first" | "second") => {
    if (direction === "horizontal") {
      return {
        hidden: {
          opacity: 0,
          x: side === "first" ? "-25vw" : "25vw",
          filter: blur ? `blur(${blurAmount}px)` : "none",
        },
        visible: {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
        },
      };
    }
    return {
      hidden: {
        opacity: 0,
        y: side === "first" ? "-25vh" : "25vh",
        filter: blur ? `blur(${blurAmount}px)` : "none",
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      },
    };
  };

  return (
    <div className="">
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={getVariants("first")}
        transition={{ duration, type: "spring", damping: 20 }}
        className={cn(
          "text-center font-bold tracking-tight drop-shadow-sm",
          "text-4xl md:text-5xl lg:text-6xl",
          "leading-normal md:leading-relaxed lg:leading-relaxed",
          className,
        )}
      >
        {firstText}
      </motion.h1>
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={getVariants("second")}
        transition={{ duration, type: "spring", damping: 20 }}
        className={cn(
          "text-center font-bold tracking-tight drop-shadow-sm",
          "text-4xl md:text-5xl lg:text-6xl",
          "leading-normal md:leading-relaxed lg:leading-relaxed",
          className,
        )}
      >
        {secondText}
      </motion.h1>
    </div>
  );
}
