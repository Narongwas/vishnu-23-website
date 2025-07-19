import "@/app/[locale]/globals.css";
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
    <BackgroundWithNoise className="from-blue bg-gradient-to-b to-white">
      <div className="relative mx-auto min-h-250 max-w-200 overflow-hidden px-4">
        {children}
      </div>
    </BackgroundWithNoise>
  );
}
