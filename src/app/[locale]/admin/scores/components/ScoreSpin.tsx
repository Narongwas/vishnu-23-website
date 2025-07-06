"use client";

import Button from "@/components/Button";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { useState } from "react";

const ScoreSpin: StyleableFC = ({ className, style }) => {
  const [score, setScore] = useState(0);

  return (
    <div className={cn("flex gap-1", className)} style={style}>
      <Button
        icon="remove"
        Size="XSmall"
        Appearance="Secondary"
        onClick={() => {
          if (score - 1000 >= 0) setScore(score - 1000);
        }}
      />
      <input
        type="number"
        min={0}
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
        className="bg-yellow-white w-20 text-center outline-none"
      />
      <Button
        icon="add"
        Size="XSmall"
        Appearance="Secondary"
        onClick={() => setScore(score + 1000)}
      />
    </div>
  );
};

export default ScoreSpin;
