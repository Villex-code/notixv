import React from "react";
import { NumberCount } from "@/app/components/text/NumberCount/NumberCount";

const Page = () => {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <NumberCount value={100} className="text-2xl font-bold text-black" />
    </div>
  );
};

export default Page;
