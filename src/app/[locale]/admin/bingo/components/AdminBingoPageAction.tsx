"use client";

import PageAction from "@/components/PageAction";
import { StyleableFC } from "@/lib/types/misc";
import Link from "next/link";

const AdminBingoPageAction: StyleableFC<{
  icon: string;
  text: string;
}> = ({ icon, text }) => {
  return (
    <div className="fixed -bottom-95 left-1/2 z-30 -translate-x-1/2">
      <Link href="/admin/bingo/scanner">
        <PageAction icon={icon} text={text} />
      </Link>
    </div>
  );
};

export default AdminBingoPageAction;
