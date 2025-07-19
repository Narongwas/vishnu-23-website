import FaqLayoutGroup from "@/components/FaqLayoutGroup";
import HomePageSponsorFooter from "@/components/HomePageSponsorFooter";
import HomeWrapper from "@/components/HomeWrapper";
import separator from "@/public/decorating/shapes/separator.svg";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

export default function Home() {
  const t = useTranslations("Home.Hero");
  return (
    <HomeWrapper>
      <div className="text-red mt-4 flex flex-col gap-5">
        <div className="type-title-large">
          <p>{t("ifd.event")}</p>
          <p>{t("ifd.date")}</p>
        </div>
        <Image src={separator} className="mx-auto" priority alt="" />
        <div className="type-title-large">
          <p>{t("vishnu.event")}</p>
          <p>{t("vishnu.date")}</p>
        </div>
        <div className="relative z-10 flex w-full items-center justify-center pt-10">
          <Button
            Size="medium"
            Appearance="tertiary"
            className="mx-auto"
            href="/registration"
          >
            <Icon name="location_on" />
            <div className="align-center type-title-medium flex">
              {t("action.registration")}
            </div>
          </Button>
        </div>
      </div>
      <HomePageSponsorFooter className="z-10" />
      <FaqLayoutGroup />
    </HomeWrapper>
  );
}
