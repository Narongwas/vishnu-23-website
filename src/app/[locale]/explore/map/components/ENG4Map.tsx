"use client";

import { useLocale, useTranslations } from "next-intl";
import BoothMap from "@/app/[locale]/explore/map/components/BoothMap";
import type { ClubItem } from "@/lib/types/club";
import type { StyleableFC } from "@/lib/types/misc";
import eng4MapTH from "@/public/map/ENG4-th.png";
import eng4MapEN from "@/public/map/ENG4-en.png";

const booths = [
  { position: 5, style: "right-[23%] top-[66%] w-[4%] h-[31%]" },
  { position: 6, style: "right-[33%] top-[66%] w-[4%] h-[31%]" },
  { position: 7, style: "right-[64%] top-[67%] w-[4%] h-[23%]" },
  { position: 8, style: "right-[74%] top-[67%] w-[4%] h-[23%]" },
];

const ENG4Map: StyleableFC<{ clubList: ClubItem[] }> = (props) => {
  const locale = useLocale();
  const image = locale === "th" ? eng4MapTH : eng4MapEN;
  const t = useTranslations("Map.Faculty");

  return (
    <BoothMap
      image={image}
      altText={t("building.eng4")}
      booths={booths}
      {...props}
    />
  );
};

export default ENG4Map;
