"use client";

import PageAction from "@/components/PageAction";
import { StyleableFC } from "@/lib/types/misc";
import { useRouter } from "next/navigation";

const AdminBingoPageAction: StyleableFC<{
  icon: string;
  text: string;
}> = ({ icon, text }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/admin/bingo/scanner");
  };

  return (
    <div className="fixed bottom-30 left-1/2 z-30 -translate-x-1/2">
      <PageAction icon={icon} text={text} onClick={handleClick} />
    </div>
  );
};

export default AdminBingoPageAction;
