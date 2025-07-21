import { StyleableFC } from "@/lib/types/misc";

type DuckBackgroundProps = { children?: React.ReactNode };

const DuckBackground: StyleableFC<DuckBackgroundProps> = ({ children }) => {
  return (
    // Main container with orange background, fabric texture, and duck mask
    <div className="bg-orange flex h-87.5 w-92.5 items-center justify-center bg-[url('/decorating/texture/fabric.png')] [mask-image:url('/decorating/shapes/duckBackground.svg')] bg-repeat [mask-size:100%_100%] [mask-position:center] [mask-repeat:no-repeat] opacity-80 bg-blend-soft-light [webkit-mask-image:url('/decorating/shapes/duckBackground.svg')] [webkit-mask-position:center] [webkit-mask-repeat:no-repeat] [webkit-mask-size:100%_100%]">
      {/* Render children inside the masked background */}
      {children}
    </div>
  );
};

export default DuckBackground;
