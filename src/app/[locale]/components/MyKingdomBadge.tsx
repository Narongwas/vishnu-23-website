import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";

const MyKingdomBadge: StyleableFC<{
  color: string;
  colorText: string;
  groupName: string;
  point: string;
  isDarker: boolean;
  className?: string;
}> = ({ color, colorText, groupName, point, isDarker, className }) => {
  return (
    <div
      className={cn(
        `bg-${color}`,
        `flex w-70 items-center justify-between border border-black/20 bg-[url('/decorating/texture/fabric.png')] bg-repeat px-2 py-2 bg-blend-soft-light`,
        className
      )}
    >
      <div className="flex items-center gap-4">
        <span
          className={`type-title-medium ${isDarker ? "text-white" : "text-black"}`}
        >
          {groupName}
        </span>
        <span
          className={`type-body-large ${isDarker ? "text-white" : "text-black"}`}
        >
          {colorText}
        </span>
      </div>
      <span
        className={`type-title-medium ${isDarker ? "text-white" : "text-black"}`}
      >
        {point}
      </span>
    </div>
  );
};

export default MyKingdomBadge;
