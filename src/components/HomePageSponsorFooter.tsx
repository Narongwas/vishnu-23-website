import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { useTranslations } from "next-intl";
import Image from "next/image";

import asean from "@/public/sponsors-logo/asean.png";
import beEngineer from "@/public/sponsors-logo/be-engineer.png";
import brighthair from "@/public/sponsors-logo/brighthair.png";
import casio from "@/public/sponsors-logo/casio.png";
import eazycal from "@/public/sponsors-logo/eazycal.png";
import gulf from "@/public/sponsors-logo/gulf.png";
import kbank from "@/public/sponsors-logo/kbank.png";
import pocari from "@/public/sponsors-logo/pocari.png";
import toa from "@/public/sponsors-logo/toa.png";

const sponsors = [
  brighthair,
  beEngineer,
  eazycal,
  pocari,
  gulf,
  toa,
  kbank,
  asean,
  casio,
];

const HomePageSponsorFooter: StyleableFC = ({ className, style }) => {
  const t = useTranslations("Home.Sponsors");
  return (
    <div
      className={cn("type-title-large text-red font-bold", className)}
      style={style}
    >
      <p className={cn("py-8")}>{t("title")}</p>
      <div className="grid grid-cols-3 gap-2">
        {sponsors.map((sponsor, index) => (
          <Image key={index} src={sponsor} width={72} height={72} alt="" />
        ))}
      </div>
    </div>
  );
};

export default HomePageSponsorFooter;
