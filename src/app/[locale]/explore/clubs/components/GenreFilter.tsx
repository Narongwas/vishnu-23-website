"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import CLUB_GENRES from "@/data/clubGenre";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

type Genre = (typeof CLUB_GENRES)[number];

const GenreFilter: StyleableFC<{
  genres: Genre[];
  selectedGenre: string | null;
  onSelect: (genre: string | null) => void;
}> = ({ genres, selectedGenre, onSelect, className, style }) => {
  return (
    <>
      {genres.map((g) => (
        <Button
          key={g.key}
          Appearance={selectedGenre === g.key ? "Primary" : "Tertiary"}
          Size="Small"
          onClick={() => onSelect(g.key === selectedGenre ? null : g.key)}
          className={cn(className)}
          style={style}
        >
          <Icon name={g.icon} />
          <span className="type-title-medium">{g.genre}</span>
        </Button>
      ))}
    </>
  );
};

export default GenreFilter;
