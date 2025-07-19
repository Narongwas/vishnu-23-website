import EN100Map from "@/app/[locale]/explore/map/components/EN100Map";
import ENG3Map from "@/app/[locale]/explore/map/components/ENG3Map";
import ENG4Map from "@/app/[locale]/explore/map/components/ENG4Map";
import LarngearMap from "@/app/[locale]/explore/map/components/LarngearMap";
import AllPageSponsorFooter from "@/components/AllPageSponsorFooter";
import BackButton from "@/components/BackButton";
import CLUBS from "@/jsondata/club.json";
import type { ClubItem } from "@/lib/types/club";
import { StyleableFC } from "@/lib/types/misc";
import { getTranslations } from "next-intl/server";

const buildingImageMap: Record<
  string,
  StyleableFC<{ clubList: ClubItem[] }>
> = {
  larngear: LarngearMap,
  eng3: ENG3Map,
  eng4: ENG4Map,
  en100: EN100Map,
};

export default async function BuildingMapPage({
  params,
}: {
  params: Promise<{ building: string }>;
}) {
  const { building } = await params;
  const t = await getTranslations("Map.Faculty");

  const BuildingMap = buildingImageMap[building];

  if (!BuildingMap) {
    return <div className="p-4">ไม่พบแผนที่ของอาคารนี้</div>;
  }

  const allClubs: ClubItem[] = Object.values(CLUBS).flat();

  const clubsInBuilding = allClubs
    .filter((club) => club.boothPosition?.building === building)
    .sort(
      (a, b) =>
        (a.boothPosition?.position ?? Infinity) -
        (b.boothPosition?.position ?? Infinity)
    );

  return (
    <>
      <div className="relative z-10 flex w-full items-center justify-between py-4">
        <BackButton variants="tertiary" />
        <p className="type-headline-small text-center">
          {t(`building.${building}`)}
        </p>
        <div className="w-9" /> {/* Spacer to balance the BackButton width */}
      </div>

      <div className="flex flex-col items-center gap-4">
        {BuildingMap ? (
          <BuildingMap clubList={clubsInBuilding} />
        ) : (
          <p>ไม่พบแผนที่ของอาคารนี้</p>
        )}
      </div>
      <AllPageSponsorFooter className="mt-10" />
    </>
  );
}
