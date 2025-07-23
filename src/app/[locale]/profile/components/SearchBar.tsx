import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import Icon from "@/components/Icon";

type SearchBarProps = {
  value: string;
  onChange?: (value: string) => void;
  className?: string;
};

const SearchBar: StyleableFC<SearchBarProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn("type-body-medium text-red relative z-10", className)}>
      <div className="flex items-center bg-white px-4 py-2.5">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="ค้นหา"
          className="flex-1 bg-transparent outline-none"
        />
        <Icon name="search" />
      </div>
    </div>
  );
};

export default SearchBar;
