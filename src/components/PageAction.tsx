import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import Icon from "@/components/Icon";
import Image from "next/image";

type PageActionProps = {
  icon?: string;
  image?: string;
  text: string;
};

const PageAction: StyleableFC<PageActionProps> = ({
  text,
  icon,
  image,
  className,
}) => {
  return (
    <div
      className={cn(
        "inline-flex h-135 w-full flex-col items-center justify-start overflow-hidden pt-12 pb-8",
        className
      )}
    >
      <div className="text-blue z-10 flex w-full flex-col items-center justify-center gap-3 pt-4">
        {icon && <Icon name={icon} size={40} />}
        {image && <Image src={image} width={40} height={40} alt="" />}
        <p className="type-title-medium">{text}</p>
      </div>
      <div className="bg-yellow absolute h-full w-183 [clip-path:ellipse()]" />
    </div>
  );
};

export default PageAction;
