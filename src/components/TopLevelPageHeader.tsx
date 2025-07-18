import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

type Props = {
  title: string;
  titleColor?: string;
  chineseText?: string;
  chineseColor?: string;
  subtitle?: string;
  subtitleColor?: string;
  background?: string;
};

const TopLevelPageHeader: StyleableFC<Props> = ({
  title,
  titleColor,
  chineseText,
  chineseColor,
  subtitle,
  subtitleColor,
  className,
  background,
}) => {
  const centerBase = "absolute left-1/2 -translate-x-1/2";

  return (
    <header
      className={cn("relative h-76 w-full shrink-0 text-center", className)}
    >
      <div className="relative mx-auto h-full max-w-100">
        {/* Circle Background */}
        <div
          className={cn(
            centerBase,
            "top-3 h-70 w-70 rounded-full bg-[url('/decorating/texture/stain.png')] bg-cover bg-no-repeat opacity-30 saturate-0",
            background
          )}
        />

        {/* Chinese Text (decorative or second title) */}
        {chineseText && (
          <div
            className={cn(
              centerBase,
              "type-chinese-cursive text-red top-3",
              "[mask-image:linear-gradient(to_bottom,black,transparent)]",
              chineseColor
            )}
          >
            {chineseText}
          </div>
        )}

        {/* Main Title */}
        <h1
          className={cn(
            centerBase,
            "type-chinese-large text-blue top-19",
            titleColor
          )}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <h2
            className={cn(
              centerBase,
              "type-title-large top-41 w-70",
              subtitleColor
            )}
          >
            {subtitle}
          </h2>
        )}
      </div>
    </header>
  );
};

export default TopLevelPageHeader;
