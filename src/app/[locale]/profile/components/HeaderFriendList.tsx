import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import SearchBar from "@/components/Searchbar";

const Header: StyleableFC<{
  search?: string;
  setSearch?: (s: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}> = ({ className, search, setSearch, onFocus, onBlur }) => {
  return (
    <header
      className={cn("flex items-center justify-between text-white", className)}
    >
      <div className="flex w-full items-center gap-10">
        <div className="font-bai text-[22px] leading-[28px] font-bold">
          เพื่อนของน้อง
        </div>
        <div className="flex flex-1 items-center bg-white px-4 py-2.5">
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
