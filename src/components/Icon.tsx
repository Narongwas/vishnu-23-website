import cn from "@/lib/utils";

type IconProps = {
  name: string;
  size?: number; // in px
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function Icon({
  name,
  fill = false,
  size = 24,
  className,
  style,
}: IconProps) {
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
}
