"use client";

import React from "react";
import StaggeredWords from "./StaggeredWords";

const Page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <StaggeredWords
        text="Custom animation example to test this"
        className="text-6xl"
      />
    </div>
  );
};

export default Page;
