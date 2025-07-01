import { StyleableFC } from "@/lib/types/misc";

const Oval: StyleableFC<{
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ className = "", style, children }) => (
  <div
    className={`fixed left-1/2 z-40 h-[540px] w-[734px] -translate-x-1/2 ${className}`}
    style={style}
  >
    <div
      className="h-full w-full"
      style={{
        background: "linear-gradient(180deg, #E9CC88 0%, #EFEBD2 100%)",
        borderRadius: "367px / 270px",
      }}
    >
      {children}
    </div>
  </div>
);

export default Oval;
