import type { Metadata } from "next";
import "./globals.css";
import TransitionTemplate from "@/app/TransitionTemplate";

export const metadata: Metadata = {
  title: "Notixv",
  description: "A new generation of fast web creation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <TransitionTemplate>{children}</TransitionTemplate>
      </body>
    </html>
  );
}
