"use client";

import ScanCard from "@/app/[locale]/games/bingo/components/ScanCard";
import PageAction from "@/components/PageAction";
import { StyleableFC } from "@/lib/types/misc";
import { useState } from "react";

const BottomPage: StyleableFC<{
  icon: string;
  text: string;
}> = ({ icon, text }) => {
  const [openScan, setOpenScan] = useState(false);

  return (
    <>
      <PageAction
        icon={icon}
        text={text}
        onClick={() => setOpenScan(true)}
        className="-bottom-170 z-10"
      />
      <ScanCard isOpen={openScan} onClose={() => setOpenScan(false)} />
    </>
  );
};

export default BottomPage;
