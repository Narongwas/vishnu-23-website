import CurvedText from "@/components/CurvedText";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import cloud1Logo from "@/public/decorating/clouds/cloud1.svg";
import cloud2Logo from "@/public/decorating/clouds/cloud2.svg";
import yellowCloud1Logo from "@/public/decorating/clouds/yellowCloud1.svg";
import yellowCloud2Logo from "@/public/decorating/clouds/yellowCloud2.svg";
import Image from "next/image";
import stain from "@/public/decorating/texture/stain.png";

type Props = {
  title: string;
  curvedText: string;
  cloudcolor?: string;
  curveTextColor?: string;
  background?: string;
  subtitle?: string;
};

const SubPageHeader: StyleableFC<Props> = ({
  title,
  curvedText,
  cloudcolor,
  curveTextColor,
  subtitle,
  className,
  background,
}) => {
  const centerBase = "absolute left-1/2 -translate-x-1/2";
  const cloudStyle = `w-full h-full object-contain`;

  const cloud1 = cloudcolor === "yellow" ? yellowCloud1Logo : cloud1Logo;
  const cloud2 = cloudcolor === "yellow" ? yellowCloud2Logo : cloud2Logo;

  return (
    <div
      className={cn(
        "text-blue fill-blue relative h-60 w-full shrink-0 text-center",
        className
      )}
    >
      <div className="relative mx-auto h-full max-w-90">
        {/* Big Circle */}
        <Image
          src={stain}
          alt=""
          className={cn(
            "top-3 h-52 w-52 rounded-full mix-blend-hard-light",
            centerBase,
            background
          )}
        />
        {/* Curved Text */}
        <CurvedText
          label={curvedText}
          className={cn("top-14 overflow-visible", curveTextColor, centerBase)}
        />
        {/* Title */}
        <div className={cn("type-chinese-medium top-21", centerBase)}>
          {title}
        </div>
        {/* Sub title */}
        <div className={cn("type-title-medium top-40", centerBase)}>
          {subtitle}
        </div>
        {/* Cloud 1 (top-left) */}
        <div className="absolute top-6 left-14 h-10 w-20 overflow-hidden">
          <Image alt="" src={cloud1} className={cloudStyle} />
        </div>
        {/* Cloud 2 (bottom-right) */}
        <div className="absolute top-33 right-10 h-7 w-14">
          <Image alt="" src={cloud2} className={cloudStyle} />
        </div>
      </div>
    </div>
  );
};

export default SubPageHeader;
