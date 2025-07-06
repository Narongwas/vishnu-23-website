"use client";

import SortByAlphaButton from "@/app/[locale]/admin//scores/components/SortByAlphaButton";
import SortByRankButton from "@/app/[locale]/admin//scores/components/SortByRankButton";
import BackButton from "@/components/BackButton";
import { StyleableFC } from "@/lib/types/misc";

type ButtonPanelProps = {
  sortMode: "place" | "alpha";
  onChangeSort: (mode: "place" | "alpha") => void;
};

const ButtonPanel: StyleableFC<ButtonPanelProps> = ({
  sortMode,
  onChangeSort,
}) => {
  return (
    <div className="absolute top-0 z-10 flex w-full items-center justify-between py-4 pr-6">
      <BackButton variants="Tertiary" />
      {sortMode === "alpha" ? (
        <SortByRankButton onClick={() => onChangeSort("place")} />
      ) : (
        <SortByAlphaButton onClick={() => onChangeSort("alpha")} />
      )}
    </div>
  );
};

export default ButtonPanel;
