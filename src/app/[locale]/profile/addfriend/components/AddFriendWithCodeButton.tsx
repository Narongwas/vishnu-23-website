"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { StyleableFC } from "@/lib/types/misc";
import { useTranslations } from "next-intl";

type CodeStampButtonProps = {
  onClick: () => void;
};

const CodeStampButton: StyleableFC<CodeStampButtonProps> = ({ onClick }) => {
  const t = useTranslations("Profile.FriendCodeDialog");

  return (
    <Button
      Size="small"
      Appearance="secondary"
      className="relative z-10"
      onClick={onClick}
    >
      <Icon name="pin" />
      <p className="type-title-medium">{t("title")}</p>
    </Button>
  );
};

export default CodeStampButton;
