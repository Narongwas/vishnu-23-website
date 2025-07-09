import { StyleableFC } from "@/lib/types/misc";

type CurvedTextProps = {
  label: string;
};

const CurvedText: StyleableFC<CurvedTextProps> = ({
  label,
  className,
  style,
}) => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      className={className}
      style={style}
    >
      <defs>
        <path
          id="circlePath"
          d="M 50,50 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
          fill="none"
        />
      </defs>
      <text>
        <textPath
          href="#circlePath"
          startOffset="25%"
          textAnchor="middle"
          className="type-chinese-small"
        >
          {label}
        </textPath>
      </text>
    </svg>
  );
};

export default CurvedText;
