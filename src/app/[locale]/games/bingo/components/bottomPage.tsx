"use client";

import PageAction from "@/components/PageAction";
import { StyleableFC } from "@/lib/types/misc";
import { motion } from "motion/react";
import { useState } from "react";
import ScanCard from "@/app/[locale]/games/bingo/components/ScanCard";

const BottomPage: StyleableFC<{
  icon: string;
  text: string;
}> = ({ icon, text }) => {
  const [openScan, setOpenScan] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.2,
        }}
        className="fixed -bottom-95 left-1/2 z-30 -translate-x-1/2"
        onClick={() => setOpenScan(true)}
      >
        <PageAction icon={icon} text={text} />
      </motion.div>
      <ScanCard isOpen={openScan} onClose={() => setOpenScan(false)} />
    </>
  );
};

export default BottomPage;
