import BackgroundWithNoise from "@/components/BackgroundWithNoise";
import { checkUserAccess } from "@/lib/middleware/checkUserAccess";
import type { Viewport } from "next";
import { redirect } from "next/navigation";

export const viewport: Viewport = {
  themeColor: "#41415f",
};

export default async function GamesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!(await checkUserAccess(["camper", "admin"]))) {
    redirect("/");
  }
  return (
    <BackgroundWithNoise className="bg-blue from-blue bg-linear-to-b to-white/30">
      <div className="relative mx-auto min-h-screen max-w-200 overflow-hidden px-4">
        {children}
      </div>
    </BackgroundWithNoise>
  );
}
