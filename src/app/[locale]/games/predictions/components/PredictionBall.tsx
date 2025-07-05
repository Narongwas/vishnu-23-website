"use client";

import Ball from "@/app/[locale]/games/predictions/components/Ball";
import PageAction from "@/app/[locale]/games/predictions/components/PageAction";
import MountainBackground from "@/components/MountainBackground";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { motion } from "motion/react";
import { useState } from "react";

const PredictionBall: StyleableFC = ({ className, style }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <div
        className={cn(
          "relative flex h-150 w-150 items-center justify-center",
          className
        )}
        style={style}
      >
        <MountainBackground className="absolute top-13 h-full w-full opacity-50" />
        <div className="z-10 flex items-center justify-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="type-body-large absolute inset-0 top-1/2 left-1/2 z-10 h-14 w-69 -translate-1/2 border-none bg-white text-center placeholder-black/40 outline-none"
            placeholder="คำตอบ"
          />
          <div className="relative scale-200">
            <Ball type="prediction" />
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeIn",
        }}
        className="fixed -bottom-80 left-1/2 -translate-x-1/2"
      >
        <PageAction icon="check" text="ทำนาย" />
      </motion.div>
    </>
  );
};

export default PredictionBall;
