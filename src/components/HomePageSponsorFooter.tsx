"use client";

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
  asean,
  kbank,
  toa,
  casio,
];

const HomePageSponsorFooter: StyleableFC = ({ className, style }) => {
  const t = useTranslations("Home.Sponsors");
  return (
    <div
      className={cn("type-title-large text-red mt-11 font-bold", className)}
      style={style}
    >
      <p className={cn("py-5")}>{t("title")}</p>
      <div className="flex flex-col items-center gap-2">
        <div className="grid grid-cols-5 gap-2">
          {sponsors.slice(0, 5).map((sponsor, index) => (
            <Image
              key={index}
              src={sponsor}
              width={64}
              height={64}
              alt={t(`sponsors.${index}`)}
            />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {sponsors.slice(5).map((sponsor, index) => (
            <Image
              key={index}
              src={sponsor}
              width={64}
              height={64}
              alt={t(`sponsors.${index + 5}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageSponsorFooter;
