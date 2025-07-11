import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";

const SearchBar: StyleableFC = ({ className }) => {
  return (
    <div
      className={cn(
        "flex h-[44px] w-[148px] items-center gap-[21px] rounded-lg bg-white px-[16px] py-[10px] shadow",
        className
      )}
      style={{ boxSizing: "border-box" }}
    >
      <input
        type="text"
        placeholder="ค้นหา"
        className="flex-1 border-none bg-transparent text-sm outline-none"
        style={{ minWidth: 0 }}
      />
      <svg width={20} height={20} fill="none" viewBox="0 0 24 24">
        <circle cx={11} cy={11} r={8} stroke="#C94F3A" strokeWidth={2} />
        <path
          d="M21 21l-3.5-3.5"
          stroke="#C94F3A"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default SearchBar;
