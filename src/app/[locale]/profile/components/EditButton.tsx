"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { StyleableFC } from "@/lib/types/misc";
import { useTranslations } from "next-intl";
//import {useRouter} from "next/navigation";

const EditButton: StyleableFC = ({ className }) => {
  const t = useTranslations("Profile.Profile.action");
  //const router = useRouter();
  return (
    <Button
      Size="small"
      Appearance="secondary"
      className={className}
      disabled={true}
      // onClick={() => {
      //   router.push(`/profile/edit`);
      // }}
    >
      <Icon name="edit" />
      <p className="type-title-medium">{t("edit")}</p>
    </Button>
  );
};

export default EditButton;
