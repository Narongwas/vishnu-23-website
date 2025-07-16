import "@/app/[locale]/globals.css";
import BackgroundWithNoise from "@/components/BackgroundWithNoise";
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#f4d590",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <BackgroundWithNoise className="from-yellow to-yellow-white bg-gradient-to-b">
          <div className="relative mx-auto min-h-screen max-w-200 px-4">
            {children}
          </div>
        </BackgroundWithNoise>
      </body>
    </html>
  );
}
