type FrayProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
  color?: string;
  style?: React.CSSProperties;
};

export const Fray = ({
  className = "",
  width = "100%",
  height = "100%",
  color = "#FFF",
  style = {},
}: FrayProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 349 72"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <g filter="url(#filter0_g_129_852)">
      <rect width="347" height="70" transform="translate(1 1)" fill={color} />
    </g>
    <defs>
      <filter
        id="filter0_g_129_852"
        x="0"
        y="0"
        width="349"
        height="72"
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
          baseFrequency="0.125 0.125"
          numOctaves="3"
          seed="9672"
        />
        <feDisplacementMap
          in="shape"
          scale="2"
          xChannelSelector="R"
          yChannelSelector="G"
          result="displacedImage"
          width="100%"
          height="100%"
        />
        <feMerge result="effect1_texture_129_852">
          <feMergeNode in="displacedImage" />
        </feMerge>
      </filter>
    </defs>
  </svg>
);
