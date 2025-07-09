import BingoSquare from "@/app/[locale]/games/bingo/components/BingoSquare";

export default function BingoTable() {
  return (
    <div className="bg-blue grid h-92 w-92 grid-cols-5 grid-rows-5 gap-2 p-2">
      {Array.from({ length: 25 }).map((_, i) => (
        <BingoSquare key={i} revealed={false} />
      ))}
    </div>
  );
}
