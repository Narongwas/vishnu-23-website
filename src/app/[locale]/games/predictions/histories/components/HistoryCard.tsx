"use client";

import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import type { PredictionHistoryItem } from "@/lib/types/prediction";
import { useLocale, useTranslations } from "next-intl";

const HistoryCard: StyleableFC<{ history: PredictionHistoryItem }> = ({
  history,
  className,
  style,
}) => {
  const locale = useLocale() as "th" | "en";
  const t = useTranslations("Predictions.PredictionCard");
  const time = history?.time === "เช้า" ? "morning" : "afternoon";
  return (
    <div
      className={cn(
        "bg-blue relative flex w-full flex-col gap-3 p-4",
        className
      )}
      style={style}
    >
      <div className={cn("fabric-texture absolute inset-0")} />
      <div>
        <p className="type-title-medium text-yellow">
          {t("round", { day: history.day, time })}
        </p>
        <p className="type-body-medium text-white">
          {history.question[locale]}
        </p>
      </div>
      <div className="flex justify-between">
        <div>
          <span className="type-title-medium pr-2 text-white">
            {history.answer}
          </span>
          {/* {!history.isCorrect && (
            <span className="type-title-medium text-yellow">
              เฉลย: {history.solution[locale]}
            </span>
          )} */}
        </div>
        {/* <Icon
          name={history.isCorrect ? "check" : "close"}
          className="text-white"
        /> */}
      </div>
    </div>
  );
};

export default HistoryCard;
