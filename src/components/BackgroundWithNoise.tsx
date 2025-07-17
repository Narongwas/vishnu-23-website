"use client";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

const BackgroundWithNoise: StyleableFC<{ children: React.ReactNode }> = ({
  children,
  className,
  style,
}) => {
  return (
    <div
      className={cn(
        "relative min-h-dvh w-full overflow-hidden bg-cover bg-fixed pb-16",
        className
      )}
      style={style}
    >
      <div className="pointer-events-none absolute inset-0 z-5 bg-[url('/decorating/texture/noise.png')] bg-repeat" />
      {children}
    </div>
  );
};

export default BackgroundWithNoise;
