// MultiwordAnimation.tsx
"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  Target,
  TargetAndTransition,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface MultiwordAnimationProps {
  words: string[];
  duration?: number;
  className?: string;
  textColor?: string;
  exitStyle?: "flip" | "fade" | "slide";
}

export function MultiwordAnimation({
  words,
  duration = 3000,
  className,
  textColor = "text-neutral-900 dark:text-neutral-100",
  exitStyle = "flip",
}: MultiwordAnimationProps) {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const exitAnimations: Record<string, TargetAndTransition> = {
    flip: {
      opacity: 0,
      y: -40,
      x: 40,
      filter: "blur(8px)",
      scale: 2,
      position: "absolute" as const,
    },
    fade: {
      opacity: 0,
      filter: "blur(8px)",
      position: "absolute" as const,
    },
    slide: {
      opacity: 0,
      x: -100,
      filter: "blur(4px)",
      position: "absolute" as const,
    },
  };

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        startAnimation();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        exit={exitAnimations[exitStyle]}
        className={cn("relative z-10 inline-block px-2", textColor, className)}
        key={currentWord}
      >
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: wordIndex * 0.3,
              duration: 0.3,
            }}
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: wordIndex * 0.3 + letterIndex * 0.05,
                  duration: 0.2,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
