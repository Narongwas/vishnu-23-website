import { StyleableFC } from "@/lib/types/misc";

interface DuckGraphicProps {
  colorsGrid: string[][];
  mask: number[][];
}

const CELL_SIZE = 12;

const DuckGraphic: StyleableFC<DuckGraphicProps> = ({ colorsGrid, mask }) => {
  // Return null if mask is empty or invalid
  if (!mask.length || !mask[0].length) {
    return null;
  }

  const numRows = mask.length;
  const numCols = mask[0].length;
  const width = numCols * CELL_SIZE;
  const height = numRows * CELL_SIZE;

  // Prepare all cells to render in SVG
  const cellsToRender = [];
  for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
    for (let colIdx = 0; colIdx < numCols; colIdx++) {
      if (mask[rowIdx][colIdx] === 1) {
        cellsToRender.push({
          key: `${rowIdx}-${colIdx}`,
          x: colIdx * CELL_SIZE,
          y: rowIdx * CELL_SIZE,
          color: colorsGrid[rowIdx][colIdx],
        });
      }
    }
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: "translate(-3px, -3px)" }}
    >
      <defs>
        {/* SVG filter for noise effect */}
        <filter
          id="unifiedNoiseFilter"
          x="-4"
          y="-4"
          width={width + 8}
          height={height + 8}
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
            baseFrequency="0.166667"
            numOctaves="3"
            seed="617"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
      <g filter="url(#unifiedNoiseFilter)">
        {/* Render each cell as a colored rectangle */}
        {cellsToRender.map((cell) => (
          <rect
            key={cell.key}
            x={cell.x}
            y={cell.y}
            width={CELL_SIZE}
            height={CELL_SIZE}
            className={`fill-${cell.color}`}
          />
        ))}
      </g>
    </svg>
  );
};

export default DuckGraphic;
