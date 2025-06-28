"use client";

import Button from "@/components/Button";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");
  const nextLocale = locale === "th" ? "en" : "th";
  function handleSwitch() {
    const segments = pathname.split("/");

    segments[1] = nextLocale;

    router.push(segments.join("/"));
  }

  return (
    <Button
      icon="language"
      label={t("label")}
      Size="Small"
      Appearance="Tertiary"
      aria-label={t("alt")}
      title={t("alt")}
      onClick={handleSwitch}
    />
  );
}
