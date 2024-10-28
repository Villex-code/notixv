import React from "react";
import TextScrollVelocity from "@/app/components/text/ScrollVelocity/ScrollVelocity";

const Page = () => {
  return (
    <div className="h-[200vh] w-screen justify-center items-center flex overflow-hidden">
      <TextScrollVelocity
        text="Scrolling Text Example"
        initialSpeed={1}
        className="text-4xl font-bold"
      />
    </div>
  );
};

export default Page;
