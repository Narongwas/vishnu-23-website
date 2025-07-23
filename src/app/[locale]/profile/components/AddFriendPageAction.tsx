"use client";

import PageAction from "@/components/PageAction";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const AddFriendPageAction = () => {
  const router = useRouter();
  const t = useTranslations("Profile.Profile.action");
  return (
    <PageAction
      text={t("add")}
      icon="person_add"
      onClick={() => router.push("/profile/addfriend")}
      className="-bottom-165 z-10"
    />
  );
};

export default AddFriendPageAction;
