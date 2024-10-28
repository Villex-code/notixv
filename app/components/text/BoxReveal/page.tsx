"use client";
import { useState } from "react";
import { BoxReveal } from "@/app/components/text/BoxReveal/BoxReveal";

export default function Home() {
  const [direction, setDirection] = useState<
    "left" | "right" | "top" | "bottom"
  >("bottom");
  const [color, setColor] = useState("#3b82f6");

  const colors = {
    blue: "#3b82f6",
    green: "#22c55e",
    red: "#ef4444",
    purple: "#8b5cf6",
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-12 p-24">
      {/* Controls */}
      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          {(["left", "right", "top", "bottom"] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => setDirection(dir)}
              className={`rounded-md px-4 py-2 capitalize ${
                direction === dir
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {dir}
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          {Object.entries(colors).map(([name, value]) => (
            <button
              key={name}
              onClick={() => setColor(value)}
              className={`rounded-md px-4 py-2 capitalize`}
              style={{
                backgroundColor: color === value ? value : "#f3f4f6",
                color: color === value ? "white" : "black",
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <div className="grid gap-8">
        {/* Card Demo */}
        <BoxReveal direction={direction} revealColor={color} width="100%">
          <div className="rounded-lg bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold">Welcome to BoxReveal</h2>
            <p className="text-gray-600">
              This is a card that reveals itself with a smooth animation when it
              comes into view.
            </p>
          </div>
        </BoxReveal>

        {/* Text Demo */}
        <BoxReveal direction={direction} revealColor={color}>
          <h1 className="text-4xl font-bold">Reveal Animation</h1>
        </BoxReveal>

        {/* Image Demo */}
        <BoxReveal direction={direction} revealColor={color} width="300px">
          <img
            src="/api/placeholder/300/200"
            alt="Demo"
            className="rounded-lg"
          />
        </BoxReveal>
      </div>
    </main>
  );
}
