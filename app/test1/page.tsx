"use client";
import React from "react";
import AwwwardsYear from "@/components/sections/AwwwardsYear";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import Inner from "@/components/pageTransitions/InnerPerspective";

const Test1Page = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-teal-200">
      <div className="text-xl font-semibold">Hey sup guys !!</div>
      <Link href="/test">Go to test</Link>
    </div>
  );
};

export default Test1Page;
