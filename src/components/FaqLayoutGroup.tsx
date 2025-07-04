"use client";

import FaqGroup from "@/components/FaqGroup";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import MOCK_FAQ from "@/mock/faqMock";
import { LayoutGroup } from "motion/react";

const FaqLayoutGroup: StyleableFC = ({ className, style }) => {
  return (
    <div
      className={cn("flex flex-col items-center gap-6", className)}
      style={style}
    >
      <LayoutGroup>
        {MOCK_FAQ.map((section) => (
          <FaqGroup key={section.id} section={section} />
        ))}
      </LayoutGroup>
    </div>
  );
};

export default FaqLayoutGroup;
