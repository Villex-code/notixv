"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  words: string[];
  className?: string;
  speed?: number;
  delay?: number;
  infinite?: boolean;
}

export function Typewriter({
  words,
  className,
  speed = 100,
  delay = 1500,
  infinite = true,
}: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        // Current word we're typing/deleting
        const currentWord = words[currentWordIndex];

        // If we're deleting, remove characters
        if (isDeleting) {
          setCurrentText(currentWord.substring(0, currentText.length - 1));
        } else {
          // If we're typing, add characters
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        }

        // Determine what to do next
        if (!isDeleting && currentText === currentWord) {
          // Finished typing, wait before starting to delete
          setTimeout(() => setIsDeleting(true), delay);
        } else if (isDeleting && currentText === "") {
          setIsDeleting(false);
          // Move to next word (or back to first if infinite is true)
          setCurrentWordIndex((prev) => {
            if (prev === words.length - 1) {
              return infinite ? 0 : prev;
            }
            return prev + 1;
          });
        }
      },
      isDeleting ? speed / 2 : speed,
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    currentWordIndex,
    words,
    speed,
    delay,
    infinite,
  ]);

  return (
    <span
      className={cn(
        "font-display inline-block min-h-[1em] text-4xl font-bold tracking-tight",
        className,
      )}
    >
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
