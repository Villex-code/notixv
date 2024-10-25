"use client";
import React from "react";
import { motion } from "framer-motion";

const slideVariants = {
  initial: {
    x: "100%",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      opacity: {
        duration: 0.7,
      },
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      opacity: {
        duration: 0.7,
      },
    },
  },
};

interface SlideTransitionProps {
  children: React.ReactNode;
}

const SlideTransition: React.FC<SlideTransitionProps> = ({ children }) => {
  return (
    <motion.div
      className="w-full min-h-screen fixed inset-0"
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </motion.div>
  );
};

export default SlideTransition;
