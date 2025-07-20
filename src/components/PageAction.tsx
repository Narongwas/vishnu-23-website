"use client";

import Icon from "@/components/Icon";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import Image from "next/image";

type PageActionProps = {
  image?: string;
  icon?: string;
  text: string;
  onClick: () => void;
};

const PageAction: StyleableFC<PageActionProps> = ({
  image,
  text,
  icon,
  onClick,
  className,
  style,
}) => {
  return (
    <div
      className={cn(
        "bg-yellow fixed left-1/2 h-200 w-250 -translate-x-1/2 overflow-hidden [clip-path:ellipse()]",
        className
      )}
      style={style}
      onClick={onClick}
    >
      <div className="text-blue z-10 flex w-full flex-col items-center justify-center gap-3 pt-8">
        {image && (
          <Image
            src={image}
            alt=""
            width={40}
            height={40}
            className="object-contain"
          />
        )}
        {icon && <Icon name={icon} size={40} />}
        <p className="type-title-medium">{text}</p>
      </div>
    </div>
  );
};

export default PageAction;
