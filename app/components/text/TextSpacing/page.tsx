"use client";
import { useState } from "react";
import { TextSpacing } from "@/app/components/text/TextSpacing/TextSpacing";

export default function Home() {
  const [animation, setAnimation] = useState<
    "fade" | "slide" | "bounce" | "scale"
  >("scale");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-8 p-24">
      <div className="space-y-4">
        <TextSpacing
          text="Welcome to Next.js!"
          animation={animation}
          className="text-blue-600"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setAnimation("fade")}
          className={`rounded-md px-4 py-2 ${
            animation === "fade"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Fade
        </button>
        <button
          onClick={() => setAnimation("slide")}
          className={`rounded-md px-4 py-2 ${
            animation === "slide"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Slide
        </button>
        <button
          onClick={() => setAnimation("bounce")}
          className={`rounded-md px-4 py-2 ${
            animation === "bounce"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Bounce
        </button>
        <button
          onClick={() => setAnimation("scale")}
          className={`rounded-md px-4 py-2 ${
            animation === "scale"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Scale
        </button>
      </div>
    </main>
  );
}
