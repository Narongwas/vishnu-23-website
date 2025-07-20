import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import Interactive from "@/components/Interactive";
import type { MouseEvent } from "react";

type ButtonSize = "medium" | "small" | "x-small";
type ButtonAppearance =
  | "primary"
  | "secondary"
  | "tertiary"
  | "secondary-variant";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Size: ButtonSize;
  Appearance: ButtonAppearance;
  children: React.ReactNode;
  href?: string;
  onClick?: (event: MouseEvent) => void;
}

const SizeClasses: Record<ButtonSize, string> = {
  medium: "px-6 py-4 gap-4",
  small: "px-4 py-2.5 gap-3",
  "x-small": "px-3 py-1.5 gap-2",
};

const iconMarginSelector: Record<ButtonSize, string> = {
  medium: "[&>:is(i,svg)]:-mx-2 [&>svg]:h-6",
  small: "[&>:is(i,svg)]:-mx-1 [&>svg]:h-5 [&>svg]:py-0.5",
  "x-small": "[&>:is(i,svg)]:-mx-1 [&>svg]:h-5 [&>svg]:py-1",
};

const AppearanceClasses: Record<ButtonAppearance, string> = {
  primary: "bg-red text-white",
  secondary: "bg-yellow text-red",
  tertiary: "bg-white text-red",
  "secondary-variant": "bg-yellow text-blue",
};

const Button: StyleableFC<ButtonProps> = ({
  Size,
  Appearance,
  className,
  style,
  children,
  ...props
}) => {
  return (
    <Interactive
      type="button"
      className={cn(
        "relative flex items-center justify-center",
        "bg-[url('/decorating/texture/fabric.png')] bg-cover bg-blend-soft-light",
        "[&>i]:!h-auto [&>i]:leading-[1.5rem]",
        SizeClasses[Size],
        AppearanceClasses[Appearance],
        iconMarginSelector[Size],
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </Interactive>
  );
};

export default Button;
