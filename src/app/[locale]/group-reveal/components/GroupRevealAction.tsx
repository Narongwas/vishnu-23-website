"use client";

import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import PageAction from "@/components/PageAction";
import { Group } from "@/lib/types/group";

const GroupRevealAction: StyleableFC<{
  image: string;
  text: string;
  groupInfo: Group;
  className?: string;
}> = ({ image, text, groupInfo, className }) => {
  return (
    <div
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
    </div>
  );
};

export default GroupRevealAction;
