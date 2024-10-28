import { Typewriter } from "@/app/components/text/Typewriter/Typewriter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">Welcome to</h1>
        <Typewriter
          words={[
            "Next.js",
            "React",
            "Tailwind CSS",
            "TypeScript",
            "Your Amazing Project",
          ]}
          className="text-6xl text-blue-600"
        />
      </div>
    </main>
  );
}
