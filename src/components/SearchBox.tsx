"use client";

interface SearchBoxProps {
  onSearch?: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  return (
    <div className="flex items-center bg-white bg-opacity-80 px-2 py-1 w-32 ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const query = (e.currentTarget.search as HTMLInputElement).value;
          console.log("searching:", query);
          onSearch?.(query);
        }}
        className="flex items-center w-full gap-1"
      >
        <input
          type="text"
          name="search"
          placeholder="ค้นหา"
          className="flex-1 bg-transparent border-none outline-none text-red font-inherit text-sm min-w-0 pl-3"
        />
        <button
          type="submit"
          className="border-none bg-none p-0 m-0 flex items-center justify-center"
        >
          <span className="font-icon text-red text-[1.25rem]">search</span>
        </button>
      </form>
    </div>
  );
}
