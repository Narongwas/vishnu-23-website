import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { useTranslations } from "next-intl";
import Image from "next/image";

import beEngineer from "@/public/sponsors-logo/be-engineer.png";
import brighthair from "@/public/sponsors-logo/brighthair.png";
import eazycal from "@/public/sponsors-logo/eazycal.png";
import gulf from "@/public/sponsors-logo/gulf.png";
import pocari from "@/public/sponsors-logo/pocari.png";

const sponsors = [brighthair, beEngineer, eazycal, pocari, gulf];

const AllPageSponsorFooter: StyleableFC = ({ className, style }) => {
  const t = useTranslations("Home.Sponsors");
  return (
    <div
      className={cn("type-title-small text-red font-bold", className)}
      style={style}
    >
      <p className="w-full py-2.5 text-center">{t("title")}</p>
      <div className="flex flex-col items-center gap-4">
        <div className="grid grid-cols-3 gap-4">
          {sponsors.slice(0, 3).map((sponsor, index) => (
            <Image key={index} src={sponsor} width={72} height={72} alt="" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {sponsors.slice(3).map((sponsor, index) => (
            <Image key={index} src={sponsor} width={72} height={72} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPageSponsorFooter;
