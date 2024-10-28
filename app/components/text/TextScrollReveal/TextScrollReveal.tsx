"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextScrollRevealProps {
  text: string;
  className?: string;
}

export const TextScrollReveal: FC<TextScrollRevealProps> = ({
  text,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const words = text.split(" ");

  return (
    <div className="h-full w-full">
      <div
        ref={containerRef}
        className={cn("relative h-full w-full", className)}
      >
        <div className="sticky top-0 flex h-screen w-full items-center justify-center bg-transparent">
          <p className="flex flex-wrap items-center justify-center text-center text-2xl font-bold text-black/20 dark:text-white/20 sm:text-3xl md:text-4xl lg:text-5xl">
            {words.map((word, index) => {
              const start = index / words.length;
              const end = start + 1 / words.length;
              return (
                <AnimatedWord
                  key={`${word}-${index}`}
                  progress={scrollYProgress}
                  range={[start, end]}
                >
                  {word}
                </AnimatedWord>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

interface AnimatedWordProps {
  children: ReactNode;
  progress: any;
  range: [number, number];
}

const AnimatedWord: FC<AnimatedWordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);

  return (
    <span className="relative mx-1.5 sm:mx-2 lg:mx-3">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }} className="text-black">
        {children}
      </motion.span>
    </span>
  );
};

export default TextScrollReveal;
