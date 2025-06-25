"use client";
import cn from "@/lib/helpers/cn";
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

export default function BackgroundWithNoise({
  children,
  classname,
}: {
  children: React.ReactNode;
  classname?: string;
}) {
  return (
    <div
      className={cn(
        "relative mb-16 min-h-dvh w-full overflow-hidden bg-cover bg-fixed",
        classname
      )}
    >
      <NoiseOverlay />
      {children}
    </div>
  );
}
