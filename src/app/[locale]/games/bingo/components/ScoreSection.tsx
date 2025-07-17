"use client";
import Score from "@/app/[locale]/games/bingo/components/Score";
import ScoreCard from "@/app/[locale]/games/bingo/components/ScoreCard";
import { useState } from "react";

type ScoreSectionProps = {
  className?: string;
  bingoData: {
    bingo: number[];
    bingoCounter: boolean[];
    bingoScore: number;
    onePointSquareCount: number;
    fivePointSquareCount: number;
    fiftyPointSquareCount: number;
    specialSquareCount: number;
    totalScore: number;
  } | null;
};

const ScoreSection = ({ className, bingoData }: ScoreSectionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={className + " cursor-pointer"}
      >
        <Score score={bingoData?.totalScore ?? 0} />
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
