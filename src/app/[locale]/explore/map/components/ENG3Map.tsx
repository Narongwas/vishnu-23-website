"use client";

import BoothMap from "@/app/[locale]/explore/map/components/BoothMap";
import type { ClubItem } from "@/lib/types/club";
import type { StyleableFC } from "@/lib/types/misc";
import eng3EN from "@/public/map/ENG3-en.png";
import eng3TH from "@/public/map/ENG3-th.png";
import { useLocale } from "next-intl";

const booths = [
  { position: 10, style: "left-[32%] top-[45%]" },
  { position: 11, style: "left-[42%] top-[45%]" },
  { position: 12, style: "left-[50%] top-[30%]" },
  { position: 13, style: "left-[60%] top-[30%]" },
];

const ENG3Map: StyleableFC<{
  clubList: ClubItem[];
}> = (props) => {
  const locale = useLocale();
  const image = locale === "th" ? eng3TH : eng3EN;

  return (
    <BoothMap
      image={image}
      altText="Map of คณะวิศวฯ ตึก3"
      booths={booths}
      {...props}
    />
  );
};

export default ENG3Map;
