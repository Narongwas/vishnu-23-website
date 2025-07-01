import Button from "@/components/Button";
import { useTranslations } from "next-intl";

export default function LoginButton() {
  const t = useTranslations("HomeHero");

  return (
    <Button
      icon="login"
      label={t("action.logIn")}
      Size="Small"
      Appearance="Primary"
      aria-label={t("action.logIn")}
      title={t("action.logIn")}
    />
  );
}
