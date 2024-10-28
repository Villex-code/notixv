import React from "react";
import TextMatrix from "@/app/components/text/TextMatrix/TextMatrix";

const Page = () => {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <TextMatrix
        text="MATRIX EFFECT"
        animation={{
          initial: { opacity: 0, scale: 0.5 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.5 },
        }}
        className="text-3xl font-bold"
      />
    </div>
  );
};

export default Page;
