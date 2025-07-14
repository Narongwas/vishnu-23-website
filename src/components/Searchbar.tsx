"use client";

import Icon from "@/components/Icon";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

const SearchBar: StyleableFC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange, className, style }) => {
  return (
    <div
      className={cn("relative col-span-2 h-full w-full", className)}
      style={style}
    >
      <input
        type="text"
        value={value}
        placeholder="ค้นหา"
        onChange={(e) => onChange(e.target.value)}
        className="text-red type-body-large min-h-full w-full bg-white pr-10 pl-4 outline-none"
      />
      <Icon
        name="Search"
        className="text-red absolute top-1/2 right-3 -translate-y-1/2"
      />
    </div>
  );
};

export default SearchBar;
