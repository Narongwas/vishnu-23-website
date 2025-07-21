import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

type TopFiveBadgeProps = {
  color: string;
  groupName: string;
  point: string;
  isDarker: boolean;
  ranking: string;
  className?: string;
};

const TopFiveBadge: StyleableFC<TopFiveBadgeProps> = ({
  color,
  groupName,
  point,
  isDarker,
  ranking,
  className,
}) => {
  return (
    <div
      className={cn(
        `bg-${color}`,
        `flex w-70 items-center justify-between border border-black/20 bg-[url('/decorating/texture/fabric.png')] bg-repeat px-2.5 py-1.5 bg-blend-soft-light`,
        className
      )}
    >
      <div className="flex items-center gap-4">
        <span
          className={`type-title-medium opacity-40 ${isDarker ? "text-white" : "text-black"}`}
        >
          {ranking}
        </span>
        <span
          className={`type-title-medium ${isDarker ? "text-white" : "text-black"}`}
        >
          {groupName}
        </span>
      </div>
      <span
        className={`type-label-large ${isDarker ? "text-white" : "text-black"}`}
      >
        {point}
      </span>
    </div>
  );
};

export default TopFiveBadge;
