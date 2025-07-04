import cn from "@/lib/helpers/cn";
import { ReactNode, ButtonHTMLAttributes } from "react";

type PageActionProps = {
  icon?: ReactNode;
  label?: string;
  labelClassName?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const PageAction = ({
  icon = "person_add",
  label = "เพิ่มเพื่อน",
  labelClassName,
  className,
  style,
  ...props
}: PageActionProps) => {
  return (
    <button
      type="button"
      className={cn(
        "relative flex w-[402px] flex-col items-center gap-3 overflow-hidden px-[181px] pt-12 pb-8",
        className
      )}
      style={style}
      {...props}
    >
      <div className="bg-yellow absolute top-4 left-[-166px] h-[540px] w-[734px] rounded-[367px/270px]" />
      <div className="text-blue relative mt-[-1px] w-fit text-4xl whitespace-nowrap">
        {icon}
      </div>
      <div
        className={cn(
          "type-title-medium text-blue relative w-fit text-center whitespace-nowrap",
          labelClassName
        )}
      >
        {label}
      </div>
    </button>
  );
};
