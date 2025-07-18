"use client";

import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import PageAction from "@/components/PageAction";
import { motion } from "motion/react";
import { Group } from "@/lib/types/group";

const AnimatedPageAction: StyleableFC<{
  image: string;
  text: string;
  groupInfo: Group;
  className?: string;
}> = ({ image, text, groupInfo, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2,
      }}
      className={cn(
        "fixed -bottom-90 left-1/2 z-30 -translate-x-1/2 lg:-bottom-80",
        className
      )}
    >
      {groupInfo?.lineLink ? (
        <a href={groupInfo.lineLink} target="_blank" rel="noopener noreferrer">
          <PageAction image={image} text={text} />
        </a>
      ) : (
        <PageAction image={image} text={text} />
      )}
    </motion.div>
  );
  //
};

export default AnimatedPageAction;
