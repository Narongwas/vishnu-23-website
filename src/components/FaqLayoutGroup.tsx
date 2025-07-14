"use client";

import FaqGroup from "@/components/FaqGroup";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { LayoutGroup } from "motion/react";
import { useTranslations } from "next-intl";
import { FaqSection } from "@/lib/types/faq";

const FaqLayoutGroup: StyleableFC = ({ className, style }) => {
  const t = useTranslations("");
  const faqs = t.raw("Faq") as FaqSection[];

  return (
    <div
      className={cn("flex flex-col items-center gap-6", className)}
      style={style}
    >
      <LayoutGroup>
        {faqs.map((section) => (
          <FaqGroup key={section.id} section={section} />
        ))}
      </LayoutGroup>
    </div>
  );
};

export default FaqLayoutGroup;
