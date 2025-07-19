"use client";

import Icon from "@/components/Icon";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { useTranslations } from "next-intl";

const Score: StyleableFC<{
  score: number;
}> = ({ score, className }) => {
  const t = useTranslations("Bingo");

  return (
    <div className={cn("flex justify-center gap-1 pt-5", className)}>
      <span className="type-title-large text-white">
        {t("scores", { score })}
      </span>
      <div className="flex items-center">
        <Icon
          name="chevron_right"
          size={24}
          className="align-center text-white"
        />
      </div>
    </div>
  );
};

export default Score;
