import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";

type TopTwoBadgeProps = {
  color: string;
  groupName: string;
  point: string;
  isDarker: boolean;
  ranking: string;
  className?: string;
  style?: React.CSSProperties;
};

const TopTwoBadge: StyleableFC<TopTwoBadgeProps> = ({
  color,
  groupName,
  point,
  isDarker,
  ranking,
  className,
  style,
}) => {
  return (
    <div
      className={cn(
        "flex h-[90%] w-full flex-col items-center",
        `bg-${color}`,
        "border border-black/20 bg-[url('/decorating/texture/fabric.png')] bg-repeat py-4 bg-blend-soft-light",
        isDarker ? "text-white" : "text-black",
        className
      )}
      style={style}
    >
      <div
        className={cn(
          "type-title-large",
          isDarker ? "text-white" : "text-black"
        )}
      >
        {groupName}
      </div>
      <div
        className={cn(
          "type-title-medium opacity-40",
          isDarker ? "mix-blend-plus-lighter" : "mix-blend-plus-darker",
          isDarker ? "text-white" : "text-black"
        )}
      >
        {ranking}
      </div>
      <div
        className={cn(
          "type-label-large mt-auto",
          isDarker ? "text-white" : "text-black"
        )}
      >
        {point}
      </div>
    </div>
  );
};

export default TopTwoBadge;
