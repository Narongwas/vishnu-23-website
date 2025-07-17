"use client";

import { StyleableFC } from "@/lib/types/misc";
import PageAction from "@/components/PageAction";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { getGroupInfoById } from "@/lib/helpers/getGroupInfoById";
import { Group } from "@/lib/types/group";

const AnimatedPageAction: StyleableFC<{
  text: string;
  label: string;
  group: string;
}> = ({ text, label, group }) => {
  const [groupInfo, setGroupInfo] = useState<Group | null>(null);

  useEffect(() => {
    if (!group) return;
    async function fetchGroup() {
      const info = await getGroupInfoById(group);
      setGroupInfo(info);
    }
    fetchGroup();
  }, [group]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2,
      }}
      className="fixed -bottom-90 left-1/2 z-30 -translate-x-1/2 lg:-bottom-80"
    >
      {groupInfo?.lineLink ? (
        <a href={groupInfo.lineLink} target="_blank" rel="noopener noreferrer">
          <PageAction image={text} text={label} />
        </a>
      ) : (
        <PageAction image={text} text={label} />
      )}
    </motion.div>
  );
  //
};

export default AnimatedPageAction;
