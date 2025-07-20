"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Common.LanguageSwitcher");
  const nextLocale = locale === "th" ? "en" : "th";
  function handleSwitch() {
    router.replace(pathname, { locale: nextLocale });
  }
  return (
    <Button
      Size="small"
      Appearance="tertiary"
      aria-label={t("alt")}
      title={t("alt")}
      onClick={handleSwitch}
    >
      <Icon name="language" />
      <span className="type-title-medium">{t("label")}</span>
    </Button>
  );
}
