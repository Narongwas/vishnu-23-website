"use client";
import Score from "@/app/[locale]/games/bingo/components/Score";
import ScoreCard from "@/app/[locale]/games/bingo/components/ScoreCard";
import { useState } from "react";

const ScoreSection = ({
  score,
  className,
}: {
  score: number;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={className + " cursor-pointer"}
      >
        <Score score={score} />
      </div>
      <ScoreCard isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default ScoreSection;
