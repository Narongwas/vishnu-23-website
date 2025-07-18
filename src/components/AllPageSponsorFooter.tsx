"use client";

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
  const t = useTranslations("Common.SponsorsFooter");
  return (
    <div
      className={cn(
        "type-title-small text-red relative z-20 text-center font-bold",
        className
      )}
      style={style}
    >
      <p className="py-4">{t("title")}</p>
      <div className="flex items-center justify-center gap-2">
        {sponsors.map((sponsor, index) => (
          <Image
            key={index}
            src={sponsor}
            width={64}
            height={64}
            alt={t(`sponsor.${index}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default AllPageSponsorFooter;
