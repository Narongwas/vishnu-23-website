import SlideControl from "@/app/[locale]/explore/presentation/components/SlideControl";
import SubPageHeader from "@/components/SubPageHeader";
import { getTranslations } from "next-intl/server";
import AllPageSponsorFooter from "@/components/AllPageSponsorFooter";

export default async function PresentationPage() {
  const t = await getTranslations("Presentation");
  return (
    <>
      <SubPageHeader
        curvedText={t("header.parent")}
        title={t("header.title")}
      />
      <SlideControl />
      <AllPageSponsorFooter className="pb-8" />
    </>
  );
}
