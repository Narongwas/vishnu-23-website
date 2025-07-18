import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import Icon from "@/components/Icon";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

const NavigationCard: StyleableFC<{
  title: string;
  label: string;
  image: StaticImageData;
  link: string;
  ovalBg?: string;
  titleColor?: string;
  labelColor?: string;
}> = ({
  title,
  label,
  image,
  link,
  ovalBg,
  titleColor,
  labelColor,
  className,
  style,
}) => {
  return (
    <div
      className={cn("relative flex w-full flex-col items-center", className)}
      style={style}
    >
      <div
        className={cn(
          "bg-yellow from-yellow to-yellow-white absolute h-135 w-250 bg-gradient-to-b [clip-path:ellipse()]",
          ovalBg
        )}
      />
      <div className="relative -mt-12 mb-10 flex h-full w-92 flex-col items-center pb-5">
        <Image src={image} alt="" priority />
        <div className="relative z-15 flex w-full flex-col items-center gap-3 text-center">
          <p className={cn("type-chinese-medium text-red", titleColor)}>
            {title}
          </p>

          <div className="relative">
            <p className={cn("type-body-medium w-70", labelColor)}>{label}</p>
            <Link href={link} className="absolute -right-8 bottom-0">
              <Icon
                name="arrow_forward"
                className={cn("text-red", titleColor)}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationCard;
