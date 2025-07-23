import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";

type OvalProps = {
  className?: string;
  children?: React.ReactNode;
};

const Oval: StyleableFC<OvalProps> = ({ className, children }) => (
  <div
    className={cn(
      "flex items-start justify-center [clip-path:ellipse()]",
      className
    )}
    style={{
      width: 1000,
      height: 800,
      flexShrink: 0,
      background: "linear-gradient(180deg, #E9CC88 0%, #EFEBD2 100%)",
    }}
  >
    {children}
  </div>
);

export default Oval;
