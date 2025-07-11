import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import SearchBar from "@/app/[locale]/profile/components/SearchBar";

const Header: StyleableFC = ({ className }) => {
  return (
    <header
      className={cn(
        "flex items-center justify-between p-4 text-white",
        className
      )}
    >
      <div className="font-bai text-[22px] leading-[28px]">เพื่อนของน้อง</div>{" "}
      <SearchBar />
    </header>
  );
};

export default Header;
