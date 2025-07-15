import BoothMap from "@/app/[locale]/explore/map/components/BoothMap";
import type { ClubItem } from "@/lib/types/club";
import type { StyleableFC } from "@/lib/types/misc";
import en100 from "@/public/map/EN-100.png";

const booths = [
  { position: 14, style: "left-[28%] bottom-[26%]" },
  { position: 15, style: "left-[44%] bottom-[26%]" },
  { position: 16, style: "left-[54%] bottom-[26%]" },
  { position: 17, style: "right-[22%] bottom-[26%]" },
  { position: 18, style: "left-[28%] bottom-[42%]" },
  { position: 19, style: "left-[44%] bottom-[42%]" },
  { position: 20, style: "left-[54%] bottom-[42%]" },
  { position: 21, style: "right-[22%] bottom-[42%]" },
  { position: 22, style: "left-[28%] top-[29%]" },
  { position: 23, style: "left-[36%] top-[29%]" },
  { position: 24, style: "left-[45%] top-[29%]" },
  { position: 25, style: "left-[54%] top-[29%]" },
  { position: 26, style: "right-[22%] top-[29%]" },
  { position: 27, style: "left-[52%] top-[12%]" },
  { position: 28, style: "right-[23%] top-[12%]" },
];

const EN100Map: StyleableFC<{
  clubList: ClubItem[];
}> = (props) => (
  <BoothMap
    image={en100}
    altText="Map of คณะวิศวฯ ตึก100"
    booths={booths}
    {...props}
  />
);

export default EN100Map;
