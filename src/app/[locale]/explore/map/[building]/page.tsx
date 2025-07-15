import EN100Map from "@/app/[locale]/explore/map/components/EN100Map";
import ENG3Map from "@/app/[locale]/explore/map/components/ENG3Map";
import LarngearMap from "@/app/[locale]/explore/map/components/LarngearMap";
import BackButton from "@/components/BackButton";
import CLUBS from "@/data/club.json";
import type { ClubItem } from "@/lib/types/club";
import { StyleableFC } from "@/lib/types/misc";

const buildingImageMap: Record<
  string,
  StyleableFC<{ clubList: ClubItem[] }>
> = {
  larngear: LarngearMap,
  "eng-3": ENG3Map,
  "en-100": EN100Map,
};

const buildingDisplayNameMap: Record<string, string> = {
  larngear: "ลานเกียร์",
  "eng-3": "ตึก 3",
  "en-100": "อาคารวิศวฯ 100 ปี",
  faculty: "คณะวิศวกรรมศาสตร์",
};

export default async function BuildingMapPage({
  params,
}: {
  params: Promise<{ building: string }>;
}) {
  const { building } = await params;

  const displayName = buildingDisplayNameMap[building];
  const mapImage = buildingImageMap[building];

  if (!mapImage || !displayName) {
    return <div className="p-4">ไม่พบแผนที่ของอาคารนี้</div>;
  }

  const allClubs: ClubItem[] = Object.values(CLUBS).flat();

  const clubsInBuilding = allClubs
    .filter((club) => club.boothPosition?.building === displayName)
    .sort(
      (a, b) =>
        (a.boothPosition?.position ?? Infinity) -
        (b.boothPosition?.position ?? Infinity)
    );

  const BuildingMap = buildingImageMap[building];

  return (
    <>
      <div className="relative z-10 flex w-full items-center justify-between py-4">
        <BackButton variants="Tertiary" />
        <p className="type-headline-small text-center">{displayName}</p>
        <div className="w-9" /> {/* Spacer to balance the BackButton width */}
      </div>

      <div className="flex flex-col items-center gap-4">
        {BuildingMap ? (
          <BuildingMap clubList={clubsInBuilding} />
        ) : (
          <p>ไม่พบแผนที่ของอาคารนี้</p>
        )}
      </div>
    </>
  );
}
