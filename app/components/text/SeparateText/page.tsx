// page.tsx
"use client";
import { SeparateText } from "@/app/components/text/SeparateText/SeparateText";
import { useState } from "react";

export default function Home() {
  const [duration, setDuration] = useState(1.5);
  const [distance, setDistance] = useState(5);
  const [delay, setDelay] = useState(0);
  const [textPair, setTextPair] = useState<number>(0);

  const textPairs = [
    { top: "Separate", bottom: "Away" },
    { top: "Welcome", bottom: "Home" },
    { top: "Hello", bottom: "World" },
    { top: "Next", bottom: "JS" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-16 p-8">
      {/* Demo Text */}
      <SeparateText
        topText={textPairs[textPair].top}
        bottomText={textPairs[textPair].bottom}
        duration={duration}
        distance={distance}
        delay={delay}
        className="text-blue-600"
      />

      {/* Controls */}
      <div className="w-full max-w-md space-y-8 rounded-lg bg-gray-50 p-6">
        {/* Text Pair Selector */}
        <div className="flex flex-wrap gap-2">
          {textPairs.map((pair, index) => (
            <button
              key={index}
              onClick={() => setTextPair(index)}
              className={`rounded-md px-4 py-2 transition-colors ${
                textPair === index
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {pair.top} / {pair.bottom}
            </button>
          ))}
        </div>

        {/* Duration Slider */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-gray-700">
              Duration: {duration}s
            </label>
            <button
              onClick={() => setDuration(1.5)}
              className="text-xs text-blue-600 hover:underline"
            >
              Reset
            </button>
          </div>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Distance Slider */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-gray-700">
              Separation Distance: {distance}vh
            </label>
            <button
              onClick={() => setDistance(5)}
              className="text-xs text-blue-600 hover:underline"
            >
              Reset
            </button>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Delay Slider */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-gray-700">
              Start Delay: {delay}s
            </label>
            <button
              onClick={() => setDelay(0)}
              className="text-xs text-blue-600 hover:underline"
            >
              Reset
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Reset All Button */}
        <button
          onClick={() => {
            setDuration(1.5);
            setDistance(5);
            setDelay(0);
          }}
          className="w-full rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
        >
          Reset All Settings
        </button>
      </div>
    </main>
  );
}
