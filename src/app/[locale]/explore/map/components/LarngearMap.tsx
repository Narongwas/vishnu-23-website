"use client";

import { useLocale, useTranslations } from "next-intl";
import BoothMap from "@/app/[locale]/explore/map/components/BoothMap";
import type { ClubItem } from "@/lib/types/club";
import type { StyleableFC } from "@/lib/types/misc";
import larngearMapTH from "@/public/map/Larngear-th.png";
import larngearMapEN from "@/public/map/Larngear-en.png";

const booths = [
  { position: 1, style: "left-[20%] top-[18%] w-[5%] h-[15%]" },
  { position: 2, style: "left-[27%] top-[18%] w-[5%] h-[15%]" },
  { position: 3, style: "left-[34%] top-[18%] w-[5%] h-[15%]" },
  { position: 4, style: "left-[42%] top-[18%] w-[5%] h-[15%]" },
  { position: 5, style: "right-[14%] top-[52%] w-[5%] h-[10%]" },
  { position: 6, style: "right-[26%] top-[52%] w-[5%] h-[10%]" },
  { position: 7, style: "right-[22%] bottom-[2%] w-[5%] h-[10%]" },
  { position: 8, style: "right-[10%] bottom-[2%] w-[5%] h-[10%]" },
  { position: 9, style: "left-[3%] top-[8%] w-[15%] h-[20%]" },
];

const LarngearMap: StyleableFC<{ clubList: ClubItem[] }> = (props) => {
  const locale = useLocale();
  const image = locale === "th" ? larngearMapTH : larngearMapEN;
  const t = useTranslations("Map");

  return (
    <BoothMap
      image={image}
      altText={t("Faculty.alt")}
      booths={booths}
      {...props}
    />
  );
};

export default LarngearMap;
