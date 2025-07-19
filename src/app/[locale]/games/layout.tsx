import BackgroundWithNoise from "@/components/BackgroundWithNoise";
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#41415f",
};

export default function GamesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BackgroundWithNoise className="from-blue to-blue/80 bg-gradient-to-b">
      <div className="relative mx-auto min-h-screen max-w-200 overflow-hidden px-4">
        {children}
      </div>
    </BackgroundWithNoise>
  );
}
