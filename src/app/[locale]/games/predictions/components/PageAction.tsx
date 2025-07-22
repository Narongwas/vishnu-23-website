import Icon from "@/components/Icon";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

type PageActionProps = {
  icon: string;
  text: string;
};

const PageAction: StyleableFC<PageActionProps> = ({
  text,
  icon,
  className,
  style,
}) => {
  return (
    <div
      className={cn(
        "inline-flex h-135 w-full flex-col items-center justify-start overflow-hidden px-44 pt-12 pb-8",
        className
      )}
      style={style}
    >
      <div className="text-blue z-10 flex flex-col items-center justify-center gap-3 pt-4">
        <Icon name={icon} size={40} />
        <p className="type-title-medium">{text}</p>
      </div>
      <div className="bg-yellow absolute h-full w-183 [clip-path:ellipse()]" />
    </div>
  );
};

export default PageAction;
