"use client";
import React from "react";
import { motion } from "framer-motion";

const expand = {
  initial: {
    top: 0,
  },
  enter: (i: number) => ({
    top: "100vh",
    transition: {
      duration: 0.4,
      delay: 0.05 * i,
      ease: [0.215, 0.61, 0.355, 1],
    },
    transitionEnd: { height: "0", top: "0" },
  }),
  exit: (i: number) => ({
    height: "100vh",
    transition: {
      duration: 0.4,
      delay: 0.05 * i,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

const opacity = {
  initial: {
    opacity: 0.5,
  },
  enter: {
    opacity: 0,
  },
  exit: {
    opacity: 0.5,
  },
};

interface StairsTransitionProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const StairsTransition: React.FC<StairsTransitionProps> = ({
  children,
  backgroundColor = "white",
}) => {
  const nbOfColumns = 5;

  const anim = (variants: any, custom: number | null = null) => ({
    initial: "initial",
    animate: "enter",
    exit: "exit",
    custom,
    variants,
  });

  return (
    <motion.div
      className="relative w-full min-h-screen"
      style={{ backgroundColor }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        {...anim(opacity)}
        className="fixed inset-0 bg-black pointer-events-none z-10"
      />
      <div className="fixed inset-0 flex pointer-events-none z-20">
        {[...Array(nbOfColumns)].map((_, i) => (
          <motion.div
            key={i}
            {...anim(expand, nbOfColumns - i)}
            className="relative h-full w-full bg-white"
          />
        ))}
      </div>
      <div className="relative z-0">{children}</div>
    </motion.div>
  );
};

export default StairsTransition;
