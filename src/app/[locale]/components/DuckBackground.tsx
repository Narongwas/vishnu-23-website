import { StyleableFC } from "@/lib/types/misc";

interface DuckBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const DuckBackground: StyleableFC<DuckBackgroundProps> = ({
  className,
  style,
  children,
}) => {
  return (
    <svg
      width="370"
      height="350"
      viewBox="0 0 370 350"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <g>
        <rect x="0" y="0" width="370" height="350" className="fill-orange" />
      </g>
      {/* Render children inside SVG */}
      <foreignObject x="0" y="0" width="370" height="350">
        <div className="bg-orange flex h-full w-full items-center justify-center bg-[url('/decorating/texture/fabric.png')] bg-repeat bg-blend-soft-light">
          {children}
        </div>
      </foreignObject>
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
            numOctaves="3"
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

export default DuckBackground;
