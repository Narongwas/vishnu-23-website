import AllPageSponsorFooter from "@/components/AllPageSponsorFooter";
import ClubPanel from "@/app/[locale]/explore/clubs/components/ClubPanel";
import BackButton from "@/components/BackButton";
import SubPageHeader from "@/components/SubPageHeader";
import { getTranslations } from "next-intl/server";

export default async function ClubPage() {
  const t = await getTranslations("Explore");
  return (
    <>
      <SubPageHeader curvedText={t("header.title")} title={t("clubs.title")} />
      <div className="absolute top-0 z-10 flex w-full items-center justify-between py-4">
        <BackButton variant="tertiary" href="/explore" />
      </div>
      <ClubPanel className="pt-8 pb-10" />
      <AllPageSponsorFooter />
    </>
  );
}
