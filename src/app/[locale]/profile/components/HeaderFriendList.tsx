"use client";

import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import SearchBar from "@/components/Searchbar";
import { useTranslations } from "next-intl";

const Header: StyleableFC<{
  search?: string;
  setSearch?: (s: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}> = ({ className, search, setSearch, onFocus, onBlur }) => {
  const t = useTranslations("Profile.FriendsList");

  return (
    <header
      className={cn("flex items-center justify-between text-white", className)}
    >
      <div className="flex w-full items-center justify-between gap-3">
        <div className="type-title-large font-bold whitespace-nowrap">
          {t("title")}
        </div>
        <div className="flex w-50 items-center bg-white px-4 py-2.5">
          <SearchBar
            value={search ?? ""}
            onChange={setSearch ?? (() => {})}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
