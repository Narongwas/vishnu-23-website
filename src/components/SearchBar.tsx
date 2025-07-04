"use client";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import Icon from "@/components/Icon";

const SearchBar: StyleableFC<{
  onSearch?: (query: string) => void;
}> = ({ className, style, onSearch }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("search") as HTMLInputElement;
    if (onSearch) onSearch(input.value);
  };

  return (
    <form
      className={cn(
        "outline-0.5 outline-red relative flex h-11 w-[148px] items-center gap-2 bg-white py-2.5 pr-2.5 pl-4 outline transition-all duration-300 ease-in-out focus-within:w-full",
        className
      )}
      style={style}
      onSubmit={handleSubmit}
      role="search"
    >
      <input
        className="type-body-large text-red tracking-body-large placeholder-red/50 min-w-0 flex-1 border-none bg-transparent outline-none"
        type="text"
        name="search"
        placeholder="ค้นหา"
        aria-label="ค้นหา"
      />
      <button
        type="submit"
        className="text-red flex h-5 w-5 shrink-0 items-center justify-center"
        aria-label="ค้นหา"
      >
        <Icon name="search" size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
