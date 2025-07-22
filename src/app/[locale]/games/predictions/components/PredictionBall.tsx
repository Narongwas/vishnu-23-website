"use client";

import Ball from "@/app/[locale]/games/predictions/components/Ball";
import PageAction from "@/components/PageAction";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  enable: boolean;
};

const PredictionBall: StyleableFC<Props> = ({
  className,
  style,
  value,
  onChange,
  onSubmit,
  enable,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const t = useTranslations("Predictions");
  return (
    <div
      className={cn(
        "relative z-5 flex w-full flex-col items-center justify-center",
        className
      )}
      style={style}
    >
      <input
        disabled={!enable}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="type-body-large absolute inset-0 top-1/2 left-1/2 z-10 h-14 w-69 -translate-1/2 border-none bg-white text-center placeholder-black/40 outline-none"
        placeholder={t("CrystalBall.form.placeholder")}
      />

      <Ball type="prediction" className="scale-200" />

      {isFocused && value.trim() !== "" && (
        <div onMouseDown={(e) => e.preventDefault()}>
          <PageAction
            icon="check"
            text={t("action.predict")}
            onClick={onSubmit}
            className="-bottom-150"
          />
        </div>
      )}
    </div>
  );
};

export default PredictionBall;
