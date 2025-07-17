import RegistrationInfo from "@/app/[locale]/registration/components/RegistrationInfo";
import BackgroundWithNoise from "@/components/BackgroundWithNoise";
import HomeButton from "@/components/HomeButton";
import { useTranslations } from "next-intl";

export default function Registration() {
  const t = useTranslations("RegistrationAnnouncement");

  return (
    <BackgroundWithNoise className="from-yellow to-yellow-white bg-gradient-to-b">
      <div className="relative z-10 mx-auto flex h-full max-w-200 flex-col items-center px-4 text-center">
        <div className="flex w-full items-center justify-between py-4">
          <div className="w-9"></div>
          <p className="type-headline-small">{t("title")}</p>
          <HomeButton />
        </div>
        <RegistrationInfo />
      </div>
    </BackgroundWithNoise>
  );
}
