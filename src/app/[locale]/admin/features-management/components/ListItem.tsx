import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

const ListItem: StyleableFC<{ children: React.ReactNode }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "border-yellow-white flex items-center border-b-2 bg-white px-4 py-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ListItem;
