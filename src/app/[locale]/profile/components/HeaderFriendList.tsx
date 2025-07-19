import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import SearchBar from "@/app/[locale]/profile/components/SearchBar";

const Header: StyleableFC<{
  search?: string;
  setSearch?: (s: string) => void;
}> = ({ className, search, setSearch }) => {
  return (
    <header
      className={cn("flex items-center justify-between text-white", className)}
    >
      <div className="font-bai text-[22px] leading-[28px]">เพื่อนของน้อง</div>
      <SearchBar value={search ?? ""} onChange={setSearch} />
    </header>
  );
};

export default Header;
