"use client";

import ClubCard from "@/app/[locale]/explore/clubs/components/ClubCard";
import FilteredResult from "@/app/[locale]/explore/clubs/components/FilteredResult";
import GenreFilter from "@/app/[locale]/explore/clubs/components/GenreFilter";
import SelectDropdown from "@/components//SelectDropdown";
import SearchBar from "@/components/Searchbar";
import rawClubs from "@/jsondata/club.json";
import cn from "@/lib/helpers/cn";
import type { ClubItem } from "@/lib/types/club";
import { StyleableFC } from "@/lib/types/misc";
import { LayoutGroup } from "motion/react";
import { useState } from "react";
import { useTranslations } from "next-intl";

const CLUB_GENRES = [
  { key: "tech", genre: "เทคโนฯ", icon: "build" },
  { key: "education", genre: "วิชาการ", icon: "book" },
  { key: "sports", genre: "กีฬา", icon: "sports_football" },
  { key: "arts", genre: "ศิลปะ", icon: "stylus_fountain_pen" },
  { key: "volunteer", genre: "อาสา", icon: "volunteer_activism" },
  { key: "other", genre: "อื่น ๆ", icon: "widgets" },
];

const ClubPanel: StyleableFC = ({ className, style }) => {
  const t = useTranslations("Clubs.Filter.booth");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const dropDownOption = [t("all"), t("true"), t("false")];
  const [booth, setBooth] = useState<string>(dropDownOption[0]);

  const keysToSearch = ["name", "description"];

  const getFiltered = (items: ClubItem[]) => {
    const term = searchTerm.toLowerCase();

    return items.filter((item) => {
      const hasBooth = !!item.boothPosition;
      if (booth === dropDownOption[1] && !hasBooth) return false;
      if (booth === dropDownOption[2] && hasBooth) return false;
      if (!term) return true;

      return keysToSearch.some((key) => {
        const value = item[key as keyof ClubItem];
        if (typeof value === "string")
          return value.toLowerCase().includes(term);
        if (Array.isArray(value))
          return value.some((v) => String(v).toLowerCase().includes(term));
        if (typeof value === "object" && value !== null)
          return Object.values(value).some((v) =>
            String(v).toLowerCase().includes(term)
          );
        return String(value).toLowerCase().includes(term);
      });
    });
  };

  const filteredItems:
    | ClubItem[]
    | { key: string; genre: string; items: ClubItem[] }[] = selectedGenre
    ? getFiltered(rawClubs[selectedGenre as keyof typeof rawClubs] || [])
    : CLUB_GENRES.map((g) => ({
        ...g,
        items: getFiltered(rawClubs[g.key as keyof typeof rawClubs] || []),
      }));

  return (
    <div className={cn("relative z-10 h-full w-full", className)} style={style}>
      <div className="grid h-full grid-cols-3 gap-2">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <div className="h-11">
          <SelectDropdown
            value={booth}
            onChange={setBooth}
            items={dropDownOption}
          />
        </div>
        <GenreFilter
          genres={CLUB_GENRES}
          selectedGenre={selectedGenre}
          onSelect={setSelectedGenre}
        />
      </div>

      <div className="mt-4">
        <LayoutGroup>
          <FilteredResult
            selectedGenre={selectedGenre}
            filteredItems={filteredItems}
            renderItem={(item) => <ClubCard club={item} className="my-3" />}
          />
        </LayoutGroup>
      </div>
    </div>
  );
};

export default ClubPanel;
