"use client";

import PageAction from "@/components/PageAction";
import { useRouter } from "next/navigation";

const AddFriendPageAction = () => {
  const router = useRouter();

  return (
    <PageAction
      text="เพิ่มเพื่อน"
      icon="person_add"
      onClick={() => router.push("/profile/addfriend")}
      className="-bottom-165 z-10"
    />
  );
};

export default AddFriendPageAction;
