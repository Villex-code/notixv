"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TextScrollVelocityProps {
  text: string;
  initialSpeed?: number;
  className?: string;
}

interface ScrollingTextProps {
  children: string;
  speed: number;
  className?: string;
}

const calculateWrappedPosition = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

export function TextScrollVelocity({
  text,
  initialSpeed = 5,
  className,
}: TextScrollVelocityProps) {
  function AnimatedText({
    children,
    speed = 100,
    className,
  }: ScrollingTextProps) {
    const positionX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothScrollVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400,
    });
    const velocityMultiplier = useTransform(
      smoothScrollVelocity,
      [0, 1000],
      [0, 5],
      {
        clamp: false,
      },
    );

    const [copies, setCopies] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      const updateCopies = () => {
        if (containerRef.current && textRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const textWidth = textRef.current.offsetWidth;
          const requiredCopies = Math.ceil(containerWidth / textWidth) + 2;
          setCopies(requiredCopies);
        }
      };

      updateCopies();
      window.addEventListener("resize", updateCopies);
      return () => window.removeEventListener("resize", updateCopies);
    }, [children]);

    const xPosition = useTransform(
      positionX,
      (v) => `${calculateWrappedPosition(-100 / copies, 0, v)}%`,
    );

    const direction = useRef<number>(1);

    useAnimationFrame((time, delta) => {
      let movement = direction.current * speed * (delta / 1000);

      if (velocityMultiplier.get() < 0) {
        direction.current = -1;
      } else if (velocityMultiplier.get() > 0) {
        direction.current = 1;
      }

      movement += direction.current * movement * velocityMultiplier.get();
      positionX.set(positionX.get() + movement);
    });

    return (
      <div
        className="w-full overflow-hidden whitespace-nowrap"
        ref={containerRef}
      >
        <motion.div
          className={cn("inline-block", className)}
          style={{ x: xPosition }}
        >
          {Array.from({ length: copies }).map((_, index) => (
            <span key={index} ref={index === 0 ? textRef : null}>
              {children}{" "}
            </span>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <section className="relative w-full">
      <AnimatedText speed={initialSpeed} className={className}>
        {text}
      </AnimatedText>
      <AnimatedText speed={-initialSpeed} className={className}>
        {text}
      </AnimatedText>
    </section>
  );
}

export default TextScrollVelocity;
