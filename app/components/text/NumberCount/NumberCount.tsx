"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function NumberCount({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number; // delay in s
  decimalPlaces?: number;
}) {
  const countRef = useRef<HTMLSpanElement>(null);
  const animValue = useMotionValue(direction === "down" ? value : 0);
  const smoothValue = useSpring(animValue, {
    damping: 60,
    stiffness: 100,
  });

  const elementVisible = useInView(countRef, { once: true, margin: "0px" });

  useEffect(() => {
    if (!elementVisible) return;

    const timer = setTimeout(() => {
      animValue.set(direction === "down" ? 0 : value);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [animValue, elementVisible, delay, value, direction]);

  useEffect(() => {
    const unsubscribe = smoothValue.on("change", (current) => {
      if (countRef.current) {
        countRef.current.textContent = Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(Number(current.toFixed(decimalPlaces)));
      }
    });

    return () => unsubscribe();
  }, [smoothValue, decimalPlaces]);

  return (
    <span
      className={cn("inline-block tabular-nums text-black", className)}
      ref={countRef}
    />
  );
}

export default NumberCount;
