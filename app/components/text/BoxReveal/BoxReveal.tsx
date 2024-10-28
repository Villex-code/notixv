"use client";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface BoxRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%" | string;
  revealColor?: string;
  duration?: number;
  delay?: number;
  direction?: "left" | "right" | "top" | "bottom";
  className?: string;
  once?: boolean;
}

export function BoxReveal({
  children,
  width = "fit-content",
  revealColor = "#3b82f6",
  duration = 0.5,
  delay = 0.25,
  direction = "left",
  className,
  once = true,
}: BoxRevealProps) {
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once });

  // Define animation variants based on direction
  const getSlideVariants = () => {
    const variants = {
      left: {
        hidden: { left: 0 },
        visible: { left: "100%" },
      },
      right: {
        hidden: { right: 0 },
        visible: { right: "100%" },
      },
      top: {
        hidden: { top: 0 },
        visible: { top: "100%" },
      },
      bottom: {
        hidden: { bottom: 0 },
        visible: { bottom: "100%" },
      },
    };
    return variants[direction];
  };

  const getContentVariants = () => {
    const variants = {
      left: {
        hidden: { opacity: 0, x: 75 },
        visible: { opacity: 1, x: 0 },
      },
      right: {
        hidden: { opacity: 0, x: -75 },
        visible: { opacity: 1, x: 0 },
      },
      top: {
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      },
      bottom: {
        hidden: { opacity: 0, y: -75 },
        visible: { opacity: 1, y: 0 },
      },
    };
    return variants[direction];
  };

  useEffect(() => {
    if (isInView) {
      slideControls.start("visible");
      mainControls.start("visible");
    } else {
      slideControls.start("hidden");
      mainControls.start("hidden");
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{ width }}
    >
      <motion.div
        variants={getContentVariants()}
        initial="hidden"
        animate={mainControls}
        transition={{
          duration,
          delay,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={getSlideVariants()}
        initial="hidden"
        animate={slideControls}
        transition={{
          duration,
          ease: "easeInOut",
        }}
        className="absolute inset-0 z-20"
        style={{
          background: revealColor,
        }}
      />
    </div>
  );
}
