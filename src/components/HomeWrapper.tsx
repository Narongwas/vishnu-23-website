"use client";

import { ciColors } from "@/themes/colors";
import Image from "next/image";
import styled from "styled-components";

const ScreenContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100dvh;
  margin-bottom: 100px;
  background: linear-gradient(${ciColors.yellow}, ${ciColors.yellowWhite});
  background-attachment: fixed;
  background-size: cover;
  overflow: hidden;

  --theme-color: ${ciColors.yellow};
`;

const NoiseOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image: url("/decorating/texture/noise.png");
  background-repeat: repeat;
  background-attachment: fixed;
  pointer-events: none;
  z-index: 5;
`;

const Cloud1Overlay = styled.div`
  position: absolute;
  background-image: url("/decorating/clouds/cloud1.svg");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 9;
`;
const Cloud2Overlay = styled.div`
  position: absolute;
  background-image: url("/decorating/clouds/cloud2.svg");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 9;
`;

export default function HomeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScreenContainer className="top-edge">
      <NoiseOverlay />
      <div className="relative h-full flex flex-col items-center max-w-[450px] text-center mx-auto overflow-hidden ">
        <Cloud1Overlay className="w-[73.5px] h-[40px] top-[381px] left-[-19px] opacity-40" />
        <Cloud2Overlay className="w-[106px] h-[51px] top-[189px] left-[332px] opacity-40" />
        <Cloud2Overlay className="w-[158px] h-[76px] top-[443px] left-[306px] transform scale-x-[-1]" />
        <div className="w-full h-[72px] bg-red-400">Header</div>
        <div className="fixed bottom-0 z-50 w-full h-[116px] bg-red-400">
          NavBar
        </div>
        <div className="mt-[44px] flex flex-col items-center">
          <Image
            src="/logo/vishnu_firstdate.svg"
            width={200}
            height={0}
            alt=""
          />
        </div>
        {children}
      </div>
    </ScreenContainer>
  );
}
