import cn from "@/lib/helpers/cn";
import type { ClubItem } from "@/lib/types/club";
import { StyleableFC } from "@/lib/types/misc";
import CLUB_GENRES from "@/data/clubGenre";

type Genre = (typeof CLUB_GENRES)[number];

const FilteredResult: StyleableFC<{
  selectedGenre: string | null;
  filteredItems:
    | ClubItem[]
    | { key: string; genre: string; items: ClubItem[] }[];
  renderItem: (item: ClubItem) => React.ReactNode;
  genres: Genre[];
}> = ({
  selectedGenre,
  filteredItems,
  renderItem,
  genres,
  className,
  style,
}) => {
  if (selectedGenre) {
    const items = filteredItems as ClubItem[];
    return (
      <>
        <p className="type-title-large text-red mb-4 text-center font-bold">
          {genres.find((g) => g.key === selectedGenre)?.genre}
        </p>
        {items.length &&
          items.map((item, i) => <div key={i}>{renderItem(item)}</div>)}
      </>
    );
  }
  return (
    <>
      {(
        filteredItems as { key: string; genre: string; items: ClubItem[] }[]
      ).map(
        (g) =>
          g.items.length > 0 && (
            <div key={g.key} className={cn("mb-6", className)} style={style}>
              <p className="type-title-large text-red mb-4 text-center font-bold">
                {g.genre}
              </p>
              {g.items.map((item, i) => (
                <div key={i}>{renderItem(item)}</div>
              ))}
            </div>
          )
      )}
    </>
  );
};

export default FilteredResult;
