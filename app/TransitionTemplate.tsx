"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useRef } from "react";
import StairsTransition from "@/components/pageTransitions/StairsTransition";
import Inner from "@/components/pageTransitions/InnerPerspective";
import CurveTransition from "@/components/pageTransitions/CurveTransition";

function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;
  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

export default function TransitionTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <StairsTransition key={pathname}>
        <FrozenRouter>{children}</FrozenRouter>
      </StairsTransition>
    </AnimatePresence>
  );
}
