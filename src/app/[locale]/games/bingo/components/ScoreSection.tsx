"use client";
import Score from "@/app/[locale]/games/bingo/components/Score";
import ScoreCard from "@/app/[locale]/games/bingo/components/ScoreCard";
import { useState } from "react";

type ScoreSectionProps = {
  score: number;
  className?: string;
  bingoData: {
    bingo: number[];
    bingoCounter: boolean[];
  } | null;
};

const ScoreSection = ({ score, className, bingoData }: ScoreSectionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={className + " cursor-pointer"}
      >
        <Score score={score} />
      </div>
      <ScoreCard
        isOpen={open}
        onClose={() => setOpen(false)}
        bingoData={bingoData}
      />
    </>
  );
};

export default ScoreSection;
