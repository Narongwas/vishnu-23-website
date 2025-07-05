import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import stain from "@/public/decorating/texture/stain.png";
import Image from "next/image";

const MountainBackground: StyleableFC = ({ className, style }) => {
  return (
    <div
      className={cn(
        "relative h-full w-full mask-b-from-20% mask-b-to-80%",
        className
      )}
      style={style}
    >
      <div className="h-full w-full mask-[url(/decorating/shapes/mountain.svg)] mask-contain mask-center mask-no-repeat">
        <Image src={stain} alt="" className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default MountainBackground;
