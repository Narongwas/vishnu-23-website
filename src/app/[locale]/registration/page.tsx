import ButtonGroup from "@/app/[locale]/registration/components/ButtonGroup";
import AllPageSponsorFooter from "@/components/AllPageSponsorFooter";
import BackgroundWithNoise from "@/components/BackgroundWithNoise";
import Icon from "@/components/Icon";
import { getServerAuth } from "@/lib/firebase/getServerAuth";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function Registration() {
  const { token } = await getServerAuth();
  if (token) {
    redirect("/registration/result");
  }

  const t = await getTranslations("Registration");

  return (
    <BackgroundWithNoise className="from-yellow to-yellow-white bg-gradient-to-b">
      <div className="relative z-10 mx-auto flex min-h-screen max-w-200 flex-col items-center justify-between p-4 text-center">
        <div className="h-11 w-full"></div>
        <div className="relative flex w-full flex-col items-center justify-center gap-5 py-4 text-balance">
          <Icon name="place" size={40} className="text-red" />
          <p className="type-title-large w-60">{t("Landing.title")}</p>
          <p className="type-body-medium">{t("Landing.desc")}</p>
          <ButtonGroup />
        </div>
        <AllPageSponsorFooter />
      </div>
    </BackgroundWithNoise>
  );
}
