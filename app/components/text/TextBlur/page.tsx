import React from "react";
import TextBlur from "@/app/components/text/TextBlur/TextBlur";

const Page = () => {
  return (
    <div>
      <TextBlur
        text="Custom Text"
        speed={1.5}
        animation={{
          hidden: { filter: "blur(8px)", opacity: 0 },
          visible: { filter: "blur(0px)", opacity: 1 },
        }}
        className="text-5xl"
      />
    </div>
  );
};

export default Page;
