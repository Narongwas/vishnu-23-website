import localFont from "next/font/local";
import { Bai_Jamjuree, Liu_Jian_Mao_Cao } from "next/font/google";
import "./globals.css";
import type { Viewport } from "next";
import type { Metadata } from "next";
import cn from "@/lib/utils";

const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin", "thai"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-bai",
  display: "optional",
});
const liuJianMaoCao = Liu_Jian_Mao_Cao({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-liu",
  display: "optional",
});

const kart3Kingdom = localFont({
  src: "../../public/fonts/Kart-3Kingdom.woff2",
  variable: "--font-kart",
  display: "optional",
});

const icon = localFont({
  src: "../../public/fonts/material-symbols-outlined.woff2",
  display: "block",
});

export const metadata: Metadata = {
  title: "Vishnu 23rd",
  description: "Intania Firstdate and Vishnu 23rd Website",
};

export const viewport: Viewport = {
  themeColor: "#f4d590",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          baiJamjuree.variable,
          liuJianMaoCao.variable,
          kart3Kingdom.variable,
          icon.className,
          "antialiased"
        )}
      >
        {children}
      </body>
    </html>
  );
}
