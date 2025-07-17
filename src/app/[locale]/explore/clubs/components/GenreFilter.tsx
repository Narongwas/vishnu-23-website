"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import cn from "@/lib/helpers/cn";
import type { ClubGenre } from "@/lib/types/club";
import { StyleableFC } from "@/lib/types/misc";
import { useTranslations } from "next-intl";

const GenreFilter: StyleableFC<{
  genres: ClubGenre[];
  selectedGenre: string | null;
  onSelect: (genre: string | null) => void;
}> = ({ genres, selectedGenre, onSelect, className, style }) => {
  const t = useTranslations("Clubs");
  return (
    <>
      {genres.map((g) => (
        <Button
          key={g.key}
          Appearance={selectedGenre === g.key ? "Primary" : "Tertiary"}
          Size="Small"
          onClick={() => onSelect(g.key === selectedGenre ? null : g.key)}
          className={cn("flex justify-center", className)}
          style={style}
        >
          <Icon name={g.icon} />
          <span className="type-title-medium">
            {t(`Filter.filter.${g.key}`)}
          </span>
        </Button>
      ))}
    </>
  );
};

export default GenreFilter;
