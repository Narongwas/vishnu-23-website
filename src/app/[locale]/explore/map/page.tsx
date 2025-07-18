import FacultyMap from "@/app/[locale]/explore/map/components/FacultyMap";
import AllPageSponsorFooter from "@/components/AllPageSponsorFooter";
import BackButton from "@/components/BackButton";
import SubPageHeader from "@/components/SubPageHeader";
import { getTranslations } from "next-intl/server";
export default async function Map() {
  const t = await getTranslations("Explore");
  return (
    <>
      <SubPageHeader curvedText={t("tabName")} title={t("map.title")} />
      <div className="absolute top-0 z-10 flex w-full items-center justify-between py-4">
        <BackButton variants="tertiary" />
      </div>
      <div className="relative z-10 -mt-16 flex flex-col items-center gap-4 py-17">
        <FacultyMap />
      </div>
      <AllPageSponsorFooter className="type-title-small text-center" />
    </>
  );
}
