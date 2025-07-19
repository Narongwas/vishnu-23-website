"use client";

import { StyleableFC } from "@/lib/types/misc";
import PageAction from "@/components/PageAction";
import { Group } from "@/lib/types/group";

const GroupRevealAction: StyleableFC<{
  image: string;
  text: string;
  groupInfo: Group;
  className?: string;
}> = ({ image, text, groupInfo, className }) => {
  const handleClick = () => {
    if (groupInfo?.lineLink) {
      window.open(groupInfo.lineLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className={className}>
      <PageAction
        image={image}
        text={text}
        className="-bottom-160 z-10"
        onClick={handleClick}
      />
    </div>
  );
};

export default GroupRevealAction;
