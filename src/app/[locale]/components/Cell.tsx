import { StyleableFC } from "@/lib/types/misc";

interface CellProps {
  color: string;
}

const Cell: StyleableFC<CellProps> = ({ color }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_g_2213_4255)">
        <rect x="2" y="2" width="14" height="14" className={`fill-${color}`} />
      </g>
      <defs>
        <filter
          id="filter0_g_2213_4255"
          x="0"
          y="0"
          width="18"
          height="18"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.1666666716337204 0.1666666716337204"
            numOctaves="3"
            seed="819"
          />
          <feDisplacementMap
            in="shape"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacedImage"
            width="100%"
            height="100%"
          />
          <feMerge result="effect1_texture_2213_4255">
            <feMergeNode in="displacedImage" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

export default Cell;
