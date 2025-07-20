import { StyleableFC } from "@/lib/types/misc";

interface CellProps {
  color: string;
  className?: string;
  style?: React.CSSProperties;
}

const Cell: StyleableFC<CellProps> = ({ color, className, style }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <g filter="url(#filter0_g_2213_4255)">
        <rect x="0" y="0" width="14" height="14" className={`fill-${color}`} />
      </g>
      <defs>
        <filter
          id="filter0_g_2213_4255"
          x="0"
          y="0"
          width="18"
          height="18"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
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
            numOctaves="45"
            seed="797"
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
