import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

const SectionHeader: StyleableFC<{ title: string }> = ({
  title,
  className,
  style,
}) => {
  return (
    <div
      className={cn(
        "mb-4 h-10 bg-[url('/decorating/shapes/flag.svg')] bg-no-repeat",
        className
      )}
      style={style}
    >
      <p className="type-title-medium py-2 pl-7 text-left text-white">
        {title}
      </p>
    </div>
  );
};

export default SectionHeader;
