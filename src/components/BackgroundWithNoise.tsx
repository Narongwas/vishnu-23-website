"use client";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import styled from "styled-components";

const NoiseOverlay = styled.div`
  position: absolute;
  inset: 0;
  height: 100%;
  background-image: url("/decorating/texture/noise.png");
  background-repeat: repeat;
  pointer-events: none;
  z-index: 5;
`;

const BackgroundWithNoise: StyleableFC<{ children: React.ReactNode }> = ({
  children,
  className,
  style,
}) => {
  return (
    <div
      className={cn(
        "relative mb-16 min-h-dvh w-full overflow-hidden bg-cover bg-fixed",
        className
      )}
      style={style}
    >
      <NoiseOverlay />
      {children}
    </div>
  );
};

export default BackgroundWithNoise;
