import localFont from "next/font/local";
import { Bai_Jamjuree, Liu_Jian_Mao_Cao } from "next/font/google";
import "@/app/globals.css";
import type { Viewport } from "next";
import type { Metadata } from "next";
import cn from "@/lib/helpers/cn";
import { AuthProvider } from "@/providers/AuthProvider";

const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin", "thai"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-bai",
});
const liuJianMaoCao = Liu_Jian_Mao_Cao({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-liu",
});

const kart3Kingdom = localFont({
  src: "../../public/fonts/Kart-3Kingdom.woff2",
  variable: "--font-kart",
});

const icon = localFont({
  src: "../../public/fonts/material-symbols-outlined.woff2",
  variable: "--font-icon",
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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
