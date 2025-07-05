import Icon from "@/components/Icon";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

type ButtonSize = "Medium" | "Small" | "XSmall";
type ButtonAppearance = "Primary" | "Secondary" | "Tertiary" | "Games";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  label?: string;
  Size: ButtonSize;
  Appearance: ButtonAppearance;
}

const SizeClasses: Record<ButtonSize, string> = {
  Medium: "px-6 py-4 gap-3",
  Small: "px-4 py-2.5 gap-3",
  XSmall: "px-3 py-1.5 gap-2",
};

const IconSize: Record<ButtonSize, number> = {
  Medium: 24,
  Small: 20,
  XSmall: 20,
};

const AppearanceClasses: Record<ButtonAppearance, string> = {
  Primary: "bg-red text-white",
  Secondary: "bg-yellow text-red",
  Tertiary: "bg-white text-red",
  Games: "bg-yellow text-blue",
};

const Button: StyleableFC<ButtonProps> = ({
  icon,
  label,
  Size,
  Appearance,
  className,
  style,
  ...props
}) => {
  return (
    <button
      className={cn(
        "relative flex items-center justify-center",
        Size && SizeClasses[Size],
        Appearance && AppearanceClasses[Appearance],
        className
      )}
      style={style}
      type="button"
      {...props}
    >
      <div className="absolute inset-0 bg-[url('/decorating/texture/fabric.png')] opacity-50 mix-blend-soft-light" />

      {icon && (
        <span className="-mx-1 flex flex-col items-center justify-center">
          <Icon name={icon} size={IconSize[Size]} />
        </span>
      )}
      {label && <span className="type-title-medium">{label}</span>}
    </button>
  );
};

export default Button;
