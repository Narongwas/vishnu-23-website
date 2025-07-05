import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import redCloud from "@/public/decorating/clouds/cloud2.svg";
import yellowCloud from "@/public/decorating/clouds/yellow_cloud.svg";
import stain from "@/public/decorating/texture/stain.svg";
import Image from "next/image";

const typeMap = {
  correct: {
    stainBg: "bg-orange",
    ballGradient: "bg-yellow",
    cloud: yellowCloud,
    shadow: "shadow-yellow",
    textureOpacity: "",
  },
  wrong: {
    stainBg: "bg-red",
    ballGradient: "bg-red",
    cloud: redCloud,
    shadow: "shadow-orange",
    textureOpacity: "",
  },
  prediction: {
    stainBg: "bg-blue",
    ballGradient: "bg-yellow",
    cloud: yellowCloud,
    shadow: "shadow-yellow",
    textureOpacity: "opacity-50",
  },
};

const Ball: StyleableFC<{
  children?: React.ReactNode;
  type: "correct" | "wrong" | "prediction";
}> = ({ type, className, style, children }) => {
  const config = typeMap[type];
  return (
    <div className={cn("relative h-27 w-34", className)} style={style}>
      <div>
        <div className="relative flex h-28 w-34 items-center justify-center">
          <div
            className={cn(
              "relative flex h-27 w-27 items-center justify-center rounded-full",
              "shadow-[0px_0px_50px_0px]",
              config.shadow
            )}
          >
            {/* Layer 1: Stain  */}
            <div
              className={cn(
                "absolute inset-0 z-0 rounded-full",
                config.stainBg
              )}
            >
              <Image
                src={stain}
                alt=""
                className={cn(
                  "absolute inset-0 h-full w-full rotate-90 rounded-full object-cover",
                  config.textureOpacity
                )}
              />
            </div>
            {/* Layer 2: Ball*/}
            <div
              className={cn(
                "absolute inset-0 rounded-full mask-b-from-0",
                config.ballGradient
              )}
            />
            {children}
          </div>
        </div>
      </div>
      <div className="opacity-50">
        <div className="absolute top-23 left-16 w-12 -scale-x-100">
          <Image src={config.cloud} alt="" className="" />
        </div>
        <div className="absolute top-19 left-22 w-12 -scale-x-100">
          <Image src={config.cloud} alt="" className="" />
        </div>
        <div className="absolute top-21 w-12">
          <Image src={config.cloud} alt="" className="" />
        </div>
      </div>
    </div>
  );
};

export default Ball;
