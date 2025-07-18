import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import Icon from "@/components/Icon";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

const NavigationCard: StyleableFC<{
  image: StaticImageData;
  title: string;
  desc: string;
  variant: "yellow" | "blue";
  href: string;
}> = ({ image, title, desc, variant, href, className, style }) => {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex w-full flex-col items-center text-balance",
        variant === "yellow" ? "text-red" : "text-yellow",
        className
      )}
      style={style}
    >
      <div className="from-yellow to-yellow-white absolute h-135 w-250 bg-gradient-to-b [clip-path:ellipse()]" />
      <div className="relative -mt-12 mb-10 flex h-full w-92 flex-col items-center pb-5">
        <Image src={image} alt="" priority />
        <div className="relative z-15 flex w-full flex-col items-center gap-3 text-center">
          <h2 className="type-chinese-medium">{title}</h2>
          <div className="relative">
            <p
              className={cn(
                "type-body-medium w-70",
                variant === "yellow" ? "text-black" : "text-white"
              )}
            >
              {desc}
            </p>
            <Icon name="arrow_forward" className="absolute -right-8 bottom-0" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NavigationCard;
