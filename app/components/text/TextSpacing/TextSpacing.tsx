"use client";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextSpacingProps {
  text: string;
  duration?: number;
  delay?: number;
  animation?: "fade" | "slide" | "bounce" | "scale";
  className?: string;
}

const animations: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slide: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  bounce: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
      },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function TextSpacing({
  text,
  duration = 0.5,
  delay = 0.04,
  animation = "slide",
  className,
}: TextSpacingProps) {
  return (
    <div className="flex flex-wrap justify-center gap-[1px]">
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={animations[animation]}
            transition={{
              duration,
              delay: i * delay,
            }}
            className={cn(
              "inline-block text-4xl font-bold drop-shadow-sm",
              className,
            )}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
