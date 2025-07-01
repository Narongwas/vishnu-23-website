"use client";

import Button from "@/components/Button";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LoginButton() {
  const t = useTranslations("HomeHero");
  const router = useRouter();
  const pathname = usePathname();

  // เช็คว่า path ปัจจุบันเป็น login หรือไม่
  const isLoginPage = pathname.includes("/login");

  const handleClick = () => {
    if (isLoginPage) {
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  return (
    <Button
      icon={isLoginPage ? "home" : "login"}
      label={isLoginPage ? "" : t("action.logIn")}
      Size="Small"
      Appearance="Primary"
      aria-label={isLoginPage ? "Home" : t("action.logIn")}
      title={isLoginPage ? "Home" : t("action.logIn")}
      onClick={handleClick}
    />
  );
}
