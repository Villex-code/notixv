"use client";
import { MultiwordAnimation } from "@/app/components/text/Multiword/MultiwordAnimation";
import { useState } from "react";

export default function Home() {
  const [duration, setDuration] = useState(3000);
  const [exitStyle, setExitStyle] = useState<"flip" | "fade" | "slide">("flip");
  const [wordSet, setWordSet] = useState<number>(0);

  const wordSets = [
    ["Hello", "Beautiful", "Amazing", "World"],
    ["Design", "Develop", "Deploy", "Repeat"],
    ["Create", "Inspire", "Innovate", "Transform"],
    ["Think", "Build", "Share", "Grow"],
  ];

  const colors = [
    "text-blue-600 dark:text-blue-400",
    "text-purple-600 dark:text-purple-400",
    "text-emerald-600 dark:text-emerald-400",
    "text-rose-600 dark:text-rose-400",
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-16 p-8">
      {/* Animation Demo */}
      <div className="text-center">
        <p className="mb-4 text-2xl font-medium text-gray-600 dark:text-gray-300">
          Let&apos;s
        </p>
        <div className="h-24">
          <MultiwordAnimation
            words={wordSets[wordSet]}
            duration={duration}
            exitStyle={exitStyle}
            className={`text-4xl font-bold ${colors[wordSet]}`}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="w-full max-w-md space-y-8 rounded-lg bg-gray-50 dark:bg-gray-800 p-6">
        {/* Word Set Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Word Set
          </label>
          <div className="flex flex-wrap gap-2">
            {wordSets.map((set, index) => (
              <button
                key={index}
                onClick={() => setWordSet(index)}
                className={`rounded-md px-4 py-2 text-sm transition-colors ${
                  wordSet === index
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                Set {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Exit Style Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Exit Animation
          </label>
          <div className="flex gap-2">
            {(["flip", "fade", "slide"] as const).map((style) => (
              <button
                key={style}
                onClick={() => setExitStyle(style)}
                className={`rounded-md px-4 py-2 text-sm capitalize transition-colors ${
                  exitStyle === style
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Slider */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Duration: {duration}ms
            </label>
            <button
              onClick={() => setDuration(3000)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Reset
            </button>
          </div>
          <input
            type="range"
            min="1000"
            max="5000"
            step="100"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </main>
  );
}
