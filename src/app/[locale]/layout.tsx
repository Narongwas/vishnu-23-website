import localFont from "next/font/local";
import { Bai_Jamjuree, Liu_Jian_Mao_Cao } from "next/font/google";
import "@/app/globals.css";
import type { Viewport } from "next";
import type { Metadata } from "next";
import cn from "@/lib/helpers/cn";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

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
  src: "../../../public/fonts/Kart-3Kingdom.woff2",
  variable: "--font-kart",
});

const icon = localFont({
  src: "../../../public/fonts/material-symbols-outlined.woff2",
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={cn(
          baiJamjuree.variable,
          liuJianMaoCao.variable,
          kart3Kingdom.variable,
          icon.className,
          "antialiased"
        )}
      >
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
