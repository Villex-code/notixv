"use client";
import React from "react";
import AwwwardsYear from "@/components/sections/AwwwardsYear";
import Link from "next/link";
import Inner from "@/components/pageTransitions/InnerPerspective";
import { AnimatePresence } from "framer-motion";

const TestPage = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-blue-100">
      <AwwwardsYear />
      <Link href="/test1">Go to test1</Link>
    </div>
  );
};

export default TestPage;
