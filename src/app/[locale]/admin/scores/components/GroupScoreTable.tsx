"use client";

import ListItem from "@/app/[locale]/admin/features-management/components/ListItem";
import ScoreRow from "@/app/[locale]/admin/scores/components/ScoreRow";
import SortByAlphaButton from "@/app/[locale]/admin/scores/components/SortByAlphaButton";
import SortByRankButton from "@/app/[locale]/admin/scores/components/SortByRankButton";
import BackButton from "@/components/BackButton";
import PageAction from "@/components/PageAction";
import type { Group } from "@/lib/types/group";
import { StyleableFC } from "@/lib/types/misc";
import { useEffect, useRef, useState } from "react";

const GroupScoreTable: StyleableFC = () => {
  const [groupScore, setGroupScore] = useState<Group[]>([]);
  const [scoreMap, setScoreMap] = useState<Record<string, number>>({});
  const [sortMode, setSortMode] = useState<"score" | "alphabet">("score");
  const [rankedList, setRankedList] = useState<Group[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const handleScoreChange = (id: string, newScore: number) => {
    setScoreMap((prev) => ({ ...prev, [id]: newScore }));
  };

  const fetchData = async () => {
    const res = await fetch("/api/v1/group/info");
    if (!res.ok) throw new Error("Failed to fetch group data");

    const data = await res.json();
    const ranked = [...data.groups].sort((a, b) => {
      if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
      return (a.name || "").localeCompare(b.name || "");
    });

    setRankedList(ranked);
    setGroupScore(ranked);
  };

  const handleSubmit = async () => {
    const updates = Object.entries(scoreMap);
    if (updates.length === 0) return;

    await Promise.allSettled(
      updates.map(async ([id, newScore]) => {
        const res = await fetch(`/api/v1/group/score/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newScore }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(`Error updating group ${id}: ${err?.error}`);
        }
      })
    );

    alert("✅ All scores updated successfully.");
    setScoreMap({});
    await fetchData();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setScoreMap({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSort = (mode: "score" | "alphabet") => {
    setSortMode(mode);
    const sorted =
      mode === "score"
        ? [...rankedList]
        : [...rankedList].sort((a, b) => a.id?.localeCompare(b.id || "") ?? 0);
    setGroupScore(sorted);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div ref={containerRef}>
      <div className="absolute top-0 z-10 flex w-full items-center justify-between py-4">
        <BackButton variants="tertiary" />
        {sortMode === "score" ? (
          <SortByRankButton onClick={() => handleSort("alphabet")} />
        ) : (
          <SortByAlphaButton onClick={() => handleSort("score")} />
        )}
      </div>

      <div className="type-body-large relative z-10 w-full overflow-x-auto pb-50 text-left">
        <ListItem className="type-title-medium bg-yellow fabric-texture relative flex border-black">
          <span className="w-full grow">อันดับ</span>
          <span className="w-full grow">กรุ๊ป</span>
          <span className="w-full grow">ก๊ก</span>
          <span className="w-full grow">คะแนน</span>
        </ListItem>

        <div className="w-full">
          {groupScore.map((item) => {
            const rank = rankedList.findIndex((g) => g.id === item.id) + 1;
            return (
              <ScoreRow
                key={item.id}
                data={item}
                rank={rank}
                scoreMap={scoreMap}
                onScoreChange={handleScoreChange}
              />
            );
          })}

          {Object.keys(scoreMap).length > 0 && (
            <div>
              <PageAction
                text="บันทึก"
                icon="check"
                className="-bottom-150 z-10"
                onClick={handleSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupScoreTable;
