"use client";

import Ball from "@/app/[locale]/games/predictions/components/Ball";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { useState } from "react";

const PredictionBall: StyleableFC = ({ className, style }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div
      className={cn(
        "relative z-5 flex w-full items-center justify-center",
        className
      )}
      style={style}
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="type-body-large absolute inset-0 top-1/2 left-1/2 z-10 h-14 w-69 -translate-1/2 border-none bg-white text-center placeholder-black/40 outline-none"
        placeholder="คำตอบ"
      />

      <Ball type="prediction" className="scale-200" />
    </div>
  );
};

export default PredictionBall;
