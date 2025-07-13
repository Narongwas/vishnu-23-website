import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import Interactive from "@/components/Interactive";

type ButtonSize = "Medium" | "Small" | "XSmall";
type ButtonAppearance = "Primary" | "Secondary" | "Tertiary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Size: ButtonSize;
  Appearance: ButtonAppearance;
  children: React.ReactNode;
}

const SizeClasses: Record<ButtonSize, string> = {
  Medium: "px-6 py-4 gap-4",
  Small: "px-4 py-2.5 gap-3",
  XSmall: "px-3 py-1.5 gap-2",
};

const iconMarginSelector: Record<ButtonSize, string[]> = {
  Medium: ["[&>svg]:-mx-2", "[&>svg]:h-6", "[&>i]:-mx-2"],
  Small: ["[&>svg]:-mx-1", "[&>svg]:h-4", "[&>i]:-mx-1"],
  XSmall: ["[&>svg]:-mx-1.5", "[&>svg]:h-4", "[&>i]:-mx-1.5"],
};

const AppearanceClasses: Record<ButtonAppearance, string> = {
  Primary: "bg-red text-white",
  Secondary: "bg-yellow text-red",
  Tertiary: "bg-white text-red",
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
        SizeClasses[Size],
        AppearanceClasses[Appearance],
        iconMarginSelector[Size],
        className
      )}
      style={{
        backgroundImage: `url('/decorating/texture/fabric.png')`,
        backgroundBlendMode: "soft-light",
        backgroundSize: "cover",
        ...style,
      }}
      {...props}
    >
      {children}
    </Interactive>
  );
};

export default Button;
