"use client";

import DecreaseButton from "@/app/[locale]/admin/scores/components/DecreaseButton";
import IncreaseButton from "@/app/[locale]/admin/scores/components/IncreaseButton";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { useState } from "react";

const ScoreSpin: StyleableFC<{
  currentScore?: number;
  onScoreChange?: (newScore: number) => void;
}> = ({ currentScore = 0, className, onScoreChange, style }) => {
  const [score, setScore] = useState(currentScore);

  const increaseScore = (value: number) => {
    const newScore = Math.max(score + value, 0);
    setScore(newScore);
    onScoreChange?.(newScore);
  };

  const decreaseScore = (value: number) => {
    if (score - value >= 0) {
      const newScore = Math.max(score - value, 0);
      setScore(newScore);
      onScoreChange?.(newScore);
    } else {
      setScore(0);
    }
  };

  return (
    <div className={cn("flex gap-1", className)} style={style}>
      <DecreaseButton
        onDencrease={(val) => decreaseScore(val)}
        currentScore={score}
      />
      <div className="bg-yellow-white flex w-20 items-center justify-center outline-none">
        {currentScore}
      </div>
      <IncreaseButton
        onIncrease={(val) => increaseScore(val)}
        currentScore={score}
      />
    </div>
  );
};

export default ScoreSpin;
