import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import firstDateLogo from "@/public/logo/firstdateWithWhite.svg";
import Image from "next/image";

const BingoSquare: StyleableFC<{ revealed: boolean; clubNumber: number }> = ({
  revealed,
  clubNumber,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative flex h-16 w-16 flex-shrink-0 items-center justify-center",
        revealed ? "bg-yellow" : "bg-blue",
        className
      )}
    >
      {/* Texture overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/decorating/texture/fabric.png')] opacity-50 mix-blend-soft-light" />
      {revealed ? (
        <Image
          src={`/bingostamp/${clubNumber}.png`}
          alt="Revealed Stamp"
          width={64}
          height={64}
          className="relative z-10 object-none object-top-left"
        />
      ) : (
        <Image
          src={firstDateLogo}
          alt="firstDate Logo"
          width={54}
          height={44}
          className="relative z-10 opacity-100"
        />
      )}
    </div>
  );
};

export default BingoSquare;
