"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

type Dimensions = {
  width: number | null;
  height: number | null;
};

const routes: { [key: string]: string } = {
  "/": "Home",
  "/submit": "Submit",
  "/about": "About",
  "/contact": "Contact",
};

interface SVGProps {
  width: number;
  height: number;
}

const SVG: React.FC<SVGProps> = ({ width, height }) => {
  const initialPath = `
    M0 300 
    Q${width / 2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 0
  `;

  const targetPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height}
    Q${width / 2} ${height} 0 ${height}
    L0 0
  `;

  return (
    <motion.svg
      className="fixed h-[calc(100vh+600px)] w-screen pointer-events-none left-0 top-0 z-50"
      initial="initial"
      animate="enter"
      exit="exit"
      variants={{
        initial: {
          top: "-300px",
        },
        enter: {
          top: "-100vh",
          transition: {
            duration: 0.75,
            delay: 0.35,
            ease: [0.76, 0, 0.24, 1],
          },
          transitionEnd: {
            top: "100vh",
          },
        },
        exit: {
          top: "-300px",
          transition: {
            duration: 0.75,
            ease: [0.76, 0, 0.24, 1],
          },
        },
      }}
    >
      <motion.path
        fill="#707070"
        variants={{
          initial: {
            d: initialPath,
          },
          enter: {
            d: targetPath,
            transition: {
              duration: 0.75,
              delay: 0.35,
              ease: [0.76, 0, 0.24, 1],
            },
          },
          exit: {
            d: initialPath,
            transition: {
              duration: 0.75,
              ease: [0.76, 0, 0.24, 1],
            },
          },
        }}
      />
    </motion.svg>
  );
};

interface CurveTransitionProps {
  children: React.ReactNode;
}

const CurveTransition: React.FC<CurveTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: null,
    height: null,
  });

  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <motion.div
      className="relative w-full min-h-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      {/* Background overlay for smooth transitions */}
      <motion.div
        className="fixed inset-0 bg-white/50 pointer-events-none z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* SVG Curve */}
      {dimensions.width != null && dimensions.height != null && (
        <SVG height={dimensions.height} width={dimensions.width} />
      )}

      {/* Route Text */}
      <motion.p
        className="fixed left-1/2 top-[40%] text-black font-semibold text-4xl z-50 -translate-x-1/2 text-center"
        initial={{ opacity: 1, y: 0 }}
        animate={{
          opacity: 0,
          y: -100,
          transition: {
            duration: 0.75,
            delay: 0.35,
            ease: [0.76, 0, 0.24, 1],
          },
        }}
        exit={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: 0.4,
            ease: [0.33, 1, 0.68, 1],
          },
        }}
      >
        {routes[pathname]}
      </motion.p>

      {/* Page Content */}
      <motion.div
        className="relative z-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 0.75,
            duration: 0.5,
          },
        }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default CurveTransition;
