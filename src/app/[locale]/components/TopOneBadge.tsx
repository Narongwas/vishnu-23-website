import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";

type TopOneBadgeProps = {
  color: string;
  groupName: string;
  point: string;
  isDarker: boolean;
  ranking: string;
  className?: string;
  style?: React.CSSProperties;
};

const TopOneBadge: StyleableFC<TopOneBadgeProps> = ({
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
        "relative flex h-full w-full flex-col items-center",
        `bg-${color}`,
        "border border-black/20 bg-[url('/decorating/texture/fabric.png')] bg-repeat pt-4 pb-12 bg-blend-soft-light [clip-path:polygon(0%_0%,_100%_0%,_100%_100%,_50%_85%,_0%_100%)]",
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
          "type-label-large mt-auto pb-4",
          isDarker ? "text-white" : "text-black"
        )}
      >
        {point}
      </div>
    </div>
  );
};

export default TopOneBadge;
