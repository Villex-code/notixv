"use client";
import { SlideInText } from "@/app/components/text/SlideInText/SlideInText";
import { useState } from "react";

export default function Home() {
  const [direction, setDirection] = useState<"horizontal" | "vertical">(
    "horizontal",
  );
  const [blur, setBlur] = useState(true);
  const [blurAmount, setBlurAmount] = useState(8);
  const [duration, setDuration] = useState(1);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-12 p-8">
      {/* Demo Text */}
      <SlideInText
        firstText="Welcome to"
        secondText="Next.js"
        direction={direction}
        blur={blur}
        blurAmount={blurAmount}
        duration={duration}
        className="text-blue-600"
      />

      {/* Controls */}
      <div className="flex flex-col gap-6 rounded-lg bg-gray-50 p-6">
        {/* Direction Toggle */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Direction</p>
          <div className="flex gap-4">
            <button
              onClick={() => setDirection("horizontal")}
              className={`rounded-md px-4 py-2 ${
                direction === "horizontal"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Left/Right
            </button>
            <button
              onClick={() => setDirection("vertical")}
              className={`rounded-md px-4 py-2 ${
                direction === "vertical"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Top/Bottom
            </button>
          </div>
        </div>

        {/* Blur Toggle */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Blur Effect</p>
          <button
            onClick={() => setBlur(!blur)}
            className={`rounded-md px-4 py-2 ${
              blur ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {blur ? "Blur On" : "Blur Off"}
          </button>
        </div>

        {/* Blur Amount Slider */}
        {blur && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              Blur Amount: {blurAmount}px
            </p>
            <input
              type="range"
              min="1"
              max="20"
              value={blurAmount}
              onChange={(e) => setBlurAmount(Number(e.target.value))}
              className="w-full"
            />
          </div>
        )}

        {/* Duration Slider */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">
            Animation Duration: {duration}s
          </p>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </main>
  );
}
