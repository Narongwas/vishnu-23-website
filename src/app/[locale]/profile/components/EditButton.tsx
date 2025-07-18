"use client";

import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { useTranslations } from "next-intl";

const EditButton: StyleableFC = ({ className }) => {
  const t = useTranslations("Profile.Profile.action");

  return (
    <Button
      Size="small"
      Appearance="secondary"
      className={cn(className)}
      disabled={true}
    >
      <Icon name="edit" />
      <p className="type-title-medium">{t("edit")}</p>
    </Button>
  );
};

export default EditButton;
