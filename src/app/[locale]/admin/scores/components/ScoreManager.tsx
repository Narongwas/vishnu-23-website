"use client";

import ButtonPanel from "@/app/[locale]/admin/scores/components/ButtonPanel";
import GroupScoreTable from "@/app/[locale]/admin/scores/components/GroupScoreTable";
import { useMemo, useState } from "react";

type GroupData = {
  group: string;
  place: number;
};

const mockData: GroupData[] = [
  { group: "A", place: 12 },
  { group: "B", place: 3 },
  { group: "C", place: 7 },
  { group: "Dog", place: 1 },
  { group: "E", place: 10 },
  { group: "F", place: 5 },
  { group: "G", place: 15 },
  { group: "H", place: 6 },
  { group: "J", place: 9 },
  { group: "K", place: 2 },
  { group: "L", place: 16 },
  { group: "M", place: 4 },
  { group: "N", place: 8 },
  { group: "P", place: 13 },
  { group: "Q", place: 11 },
  { group: "R", place: 14 },
  { group: "S", place: 17 },
  { group: "T", place: 14 },
];

export default function ScoreManager() {
  const [sortMode, setSortMode] = useState<"place" | "alpha">("place");

  const sortedData = useMemo(() => {
    if (sortMode === "place") {
      return [...mockData].sort((a, b) => a.place - b.place);
    }
    return [...mockData].sort((a, b) => a.group.localeCompare(b.group));
  }, [sortMode]);

  return (
    <>
      <ButtonPanel sortMode={sortMode} onChangeSort={setSortMode} />
      <GroupScoreTable data={sortedData} />
    </>
  );
}
