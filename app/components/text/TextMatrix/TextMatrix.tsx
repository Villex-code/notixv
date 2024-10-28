"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextMatrixProps {
  text: string;
  speed?: number;
  animation?: Variants;
  className?: string;
  autoStart?: boolean;
}

const matrixCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const getRandomChar = (max: number) => Math.floor(Math.random() * max);

export function TextMatrix({
  text,
  speed = 800,
  animation = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 3 },
  },
  className,
  autoStart = true,
}: TextMatrixProps) {
  const [letters, setLetters] = useState(text.split(""));
  const [isAnimating, setIsAnimating] = useState(false);
  const charCount = useRef(0);
  const firstMount = useRef(true);

  const startAnimation = () => {
    charCount.current = 0;
    setIsAnimating(true);
  };

  useEffect(() => {
    const animationSpeed = speed / (text.length * 10);

    const timer = setInterval(() => {
      if (!autoStart && firstMount.current) {
        clearInterval(timer);
        firstMount.current = false;
        return;
      }

      if (charCount.current < text.length) {
        setLetters((currentLetters) =>
          currentLetters.map((char, index) =>
            char === " "
              ? char
              : index <= charCount.current
                ? text[index]
                : matrixCharacters[getRandomChar(26)],
          ),
        );
        charCount.current = charCount.current + 0.1;
      } else {
        setIsAnimating(false);
        clearInterval(timer);
      }
    }, animationSpeed);

    return () => clearInterval(timer);
  }, [text, speed, isAnimating, autoStart]);

  return (
    <div
      className="flex cursor-default scale-100 overflow-hidden py-2"
      onMouseEnter={startAnimation}
    >
      <AnimatePresence mode="wait">
        {letters.map((char, index) => (
          <motion.h1
            key={index}
            className={cn("font-mono", char === " " ? "w-3" : "", className)}
            {...animation}
          >
            {char.toUpperCase()}
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default TextMatrix;
