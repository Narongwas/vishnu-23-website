"use client";

import ListItem from "@/app/[locale]/admin/features-management/components/ListItem";
import ScoreSpin from "@/app/[locale]/admin/scores/components/ScoreSpin";
import type { Group } from "@/lib/types/group";
import { StyleableFC } from "@/lib/types/misc";

const ScoreRow: StyleableFC<{
  data: Group;
  rank: number;
  onScoreChange?: (id: string, score: number) => void;
  scoreMap: Record<string, number>;
}> = ({ data, rank, onScoreChange, scoreMap }) => {
  const displayedScore = scoreMap[data.id] ?? data.totalScore;
  const handleScoreChange = (newScore: number) => {
    onScoreChange?.(data.id, newScore);
  };
  return (
    <div className="type-body-medium w-full">
      <ListItem key={data.totalScore} className="type-body-medium flex w-full">
        <span className="w-full grow">{rank}</span>
        <span className="w-full grow">{data.id}</span>
        <span className="w-full grow">{data.groupName}</span>
        <span className="w-full grow">
          <ScoreSpin
            currentScore={displayedScore}
            onScoreChange={handleScoreChange}
          />
        </span>
      </ListItem>
    </div>
  );
};

export default ScoreRow;
