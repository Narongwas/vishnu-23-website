import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

type IconProps = {
  name: string;
  size?: number; // in px
  fill?: boolean;
};

const Icon: StyleableFC<IconProps> = ({
  name,
  fill = false,
  size = 20,
  className,
  style,
}) => {
  const sizeRem = `${size / 16}rem`;

  return (
    <i
      aria-hidden
      translate="no"
      style={{
        ...style,
        width: sizeRem,
        height: sizeRem,
        fontSize: sizeRem,
        fontVariationSettings: `"FILL" ${fill ? 1 : 0}, "opsz" ${size}`,
      }}
      className={cn(
        "font-icon block leading-none not-italic select-none",
        className
      )}
    >
      {name}
    </i>
  );
};

export default Icon;
