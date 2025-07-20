import "@/app/[locale]/globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import InAppBrowserDetector from "@/components/InAppBrowserDetector";
import { routing } from "@/i18n/routing";
import cn from "@/lib/helpers/cn";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { Bai_Jamjuree, Liu_Jian_Mao_Cao } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";

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
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

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
        <AuthProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
            <InAppBrowserDetector />
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
