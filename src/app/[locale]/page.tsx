import FaqLayoutGroup from "@/components/FaqLayoutGroup";
import HomePageSponsorFooter from "@/components/HomePageSponsorFooter";
import HomeWrapper from "@/components/HomeWrapper";
import separator from "@/public/decorating/shapes/separator.svg";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { checkFeatureFlagByName } from "@/lib/services/featureFlags.service";

export default async function Home() {
  const t = await getTranslations("Home.Hero");

  const groupFeatureFlag = await checkFeatureFlagByName("group-reveal");

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
        {groupFeatureFlag && (
          <div className="relative z-10 flex w-full flex-wrap items-center justify-center gap-2 pt-10">
            <Button Size="medium" Appearance="tertiary" href="/registration">
              <Icon name="location_on" />
              <div className="align-center type-title-medium flex">
                {t("action.registration")}
              </div>
            </Button>
            {/* <Button Size="medium" Appearance="tertiary" href="/group-reveal">
              <Icon name="person_celebrate" />
              <div className="align-center type-title-medium flex">
                {t("action.KingdomReveal")}
              </div>
            </Button> */}
          </div>
        )}
      </div>

      <HomePageSponsorFooter className="z-10" />

      <FaqLayoutGroup />
    </HomeWrapper>
  );
}
