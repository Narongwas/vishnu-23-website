import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import SearchBar from "@/components/Searchbar";

const Header: StyleableFC<{
  search?: string;
  setSearch?: (s: string) => void;
}> = ({ className, search, setSearch }) => {
  return (
    <header
      className={cn("flex items-center justify-between text-white", className)}
    >
      <div className="font-bai text-[22px] leading-[28px]">เพื่อนของน้อง</div>
      <div className="flex items-center bg-white px-4 py-2.5">
        <SearchBar value={search ?? ""} onChange={setSearch ?? (() => {})} />
      </div>
    </header>
  );
};

export default Header;
