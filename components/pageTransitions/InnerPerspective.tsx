"use client";
import React from "react";
import { motion } from "framer-motion";

const perspective = {
  initial: {
    scale: 1,
    y: 0,
    opacity: 1,
  },
  enter: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    scale: 0.9,
    y: -150,
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const slide = {
  initial: {
    y: "100%",
  },
  enter: {
    y: "100%",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    y: "0%",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

interface InnerProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const Inner: React.FC<InnerProps> = ({
  children,
  backgroundColor = "white",
}) => {
  return (
    <motion.div
      className="relative w-full min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor }}
    >
      {/* The white overlay that slides up */}
      <motion.div
        className="fixed inset-0 bg-white z-50 pointer-events-none"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={slide}
      />

      {/* The content container that scales and fades */}
      <motion.div
        className="relative w-full h-full z-0"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={perspective}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Inner;
