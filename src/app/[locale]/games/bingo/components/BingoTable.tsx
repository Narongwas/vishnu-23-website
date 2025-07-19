import BingoSquare from "@/app/[locale]/games/bingo/components/BingoSquare";

type BingoTableProps = {
  bingoData: {
    bingo: number[];
    bingoCounter: boolean[];
  } | null;
  className?: string;
};

export default function BingoTable({ bingoData, className }: BingoTableProps) {
  if (!bingoData) {
    return (
      <div className="bg-blue grid h-92 w-92 grid-cols-5 grid-rows-5 gap-2 p-2">
        {[...Array(25)].map((_, i) => (
          <BingoSquare key={bingo[i]} revealed={false} clubNumber={bingo[i]} />
        ))}
      </div>
    );
  }

  const { bingo, bingoCounter } = bingoData;

  console.log("Bingo Data:", bingoData);
  return (
    <div
      className={`bg-blue grid h-92 w-92 grid-cols-5 grid-rows-5 gap-2 p-2 ${className ?? ""}`}
    >
      {bingo.slice(0, 25).map((clubIndex, i) => (
        <BingoSquare key={i} revealed={bingoCounter[i]} clubNumber={bingo[i]} />
      ))}
    </div>
  );
}
