import "@/app/[locale]/globals.css";
import cn from "@/lib/helpers/cn";
import type { Viewport } from "next";
import BackgroundWithNoise from "@/components/BackgroundWithNoise";

export const viewport: Viewport = {
  themeColor: "#f4d590",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased")}>
        <BackgroundWithNoise className="from-yellow to-yellow-white bg-gradient-to-b">
          <div className="relative mx-auto max-w-200">{children}</div>
        </BackgroundWithNoise>
      </body>
    </html>
  );
}
