"use client";

import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { signOut } from "@/lib/firebase/auth";
import { useTranslations } from "next-intl";

const LogoutButton: StyleableFC = ({ className }) => {
  const t = useTranslations("Profile.Profile.action");

  const handleLogout = async () => {
    try {
      await signOut();
      await fetch("/api/v1/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Button
      Size="small"
      Appearance="primary"
      className={cn(className)}
      onClick={handleLogout}
    >
      <Icon name="logout" />
      <p className="type-title-medium">{t("logout")}</p>
    </Button>
  );
};

export default LogoutButton;
