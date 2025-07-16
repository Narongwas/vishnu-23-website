"use client";

import FaqGroup from "@/components/FaqGroup";
import cn from "@/lib/helpers/cn";
import { FaqSection } from "@/lib/types/faq";
import { StyleableFC } from "@/lib/types/misc";
import { LayoutGroup } from "motion/react";
import { useTranslations } from "next-intl";

const FaqLayoutGroup: StyleableFC = ({ className, style }) => {
  const t = useTranslations("Home.Faq");
  const faqs = t.raw("questions") as FaqSection[];

  return (
    <div className="z-30 w-full pb-30">
      <div className="type-title-large text-red mt-17 mb-5 text-center font-bold">
        <p>{t("title")}</p>
      </div>
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
    </div>
  );
};

export default FaqLayoutGroup;
