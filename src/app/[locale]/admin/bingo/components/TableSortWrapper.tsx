"use client";
import { useState, useMemo } from "react";
import PageHeader from "@/app/[locale]/admin/bingo/components/PageHeader";
import Table from "@/app/[locale]/admin/bingo/components/Table";

type GroupData = {
  id: string;
  lineLink: string;
  totalScore: number;
  registrationsPoint: {
    packageNumber: number;
    firstdate: string;
    vishnu: string;
  };
  groupName: string;
  bingo: number[];
  bingoScore: number;
};

type TableSortWrapperProps = {
  groupData: GroupData[];
};

const TableSortWrapper = ({ groupData }: TableSortWrapperProps) => {
  const withScoreRank = useMemo(() => {
    return [...groupData]
      .sort((a, b) => b.bingoScore - a.bingoScore)
      .map((item, idx) => ({
        ...item,
        scoreRank: idx + 1,
      }));
  }, [groupData]);

  const [sortType, setSortType] = useState<"id" | "score">("score");

  const sortedData = useMemo(() => {
    if (sortType === "id") {
      return [...withScoreRank].sort((a, b) => a.id.localeCompare(b.id));
    }
    return withScoreRank;
  }, [withScoreRank, sortType]);

  return (
    <>
      <PageHeader
        sortType={sortType}
        onToggleSort={() => setSortType((s) => (s === "id" ? "score" : "id"))}
      />
      <div className="relative z-10 mx-auto -mt-28 max-w-200 px-4">
        <Table groupData={sortedData} />
      </div>
    </>
  );
};

export default TableSortWrapper;
