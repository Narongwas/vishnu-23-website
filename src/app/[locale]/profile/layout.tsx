import "@/app/[locale]/globals.css";
import BackgroundWithNoise from "@/components/BackgroundWithNoise";
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#A7271D",
};

export default function GamesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BackgroundWithNoise className="flex flex-col justify-center">
      <div className="bg-red absolute inset-0 bg-gradient-to-b to-white/30">
        <div className="relative mx-auto max-w-200">{children}</div>
      </div>
    </BackgroundWithNoise>
  );
}
