"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Common.LanguageSwitcher");
  const nextLocale = locale === "th" ? "en" : "th";
  function handleSwitch() {
    const segments = pathname.split("/");

    if (!["th", "en"].includes(segments[1])) {
      console.warn("Not a valid locale segment:", segments[1]); // check valid locale
      return;
    }

    segments[1] = nextLocale;

    router.push(segments.join("/"));
  }

  return (
    <Button
      Size="Small"
      Appearance="Tertiary"
      aria-label={t("alt")}
      title={t("alt")}
      onClick={handleSwitch}
    >
      <Icon name="language" />
      <span className="type-title-medium">{t("label")}</span>
    </Button>
  );
}
