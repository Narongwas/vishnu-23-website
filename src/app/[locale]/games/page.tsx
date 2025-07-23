
import AllPageSponsorFooter from "@/components/AllPageSponsorFooter";
import MountainBackground from "@/components/MountainBackground";
import NavBar from "@/components/NavBar";
import NavigationCard from "@/components/NavigationCard";
import TopLevelPageHeader from "@/components/TopLevelPageHeader";
import { checkFeatureFlagByName } from "@/lib/services/featureFlags.service";
import bingo from "@/public/navigation/Bingo.png";
import prediction from "@/public/navigation/Predictions.png";
import { getTranslations } from "next-intl/server";

export default async function GamePage() {
  const bingoFlag = await checkFeatureFlagByName("bingo-game");
  const predictionFlag = await checkFeatureFlagByName("prediction-game");
  const t = await getTranslations("Games");

  const cards = [
    {
      image: bingo,
      title: t("bingo.title"),
      label: t("bingo.subtitle"),
      link: "/games/bingo",
      flag: bingoFlag,
    },
    {
      image: prediction,
      title: t("predictions.title"),
      label: t("predictions.subtitle"),
      link: "/games/predictions",
      flag: predictionFlag,
    },
  ];
  return (
    <>
      <TopLevelPageHeader
        title={t("tabName")}
        titleColor="text-white"
        chineseText={t("header.chinese")}
        chineseColor="text-yellow"
        subtitle={t("header.subtitle")}
        subtitleColor="text-white"
        background="bg-white/10 saturate-0 opacity-30"
      />
      <MountainBackground className="absolute top-10 left-0 h-full w-full opacity-50" />
      <div className="relative z-15 mt-4 flex w-full flex-col items-center gap-4 px-4">
        {cards
          .filter((card) => card.flag)
          .map((card, index) => (
            <NavigationCard
              key={index}
              image={card.image}
              title={card.title}
              desc={card.label}
              href={card.link}
              variant="blue"
            />
          ))}
      </div>
      <AllPageSponsorFooter className="py-8 text-white" />
      <NavBar />
    </>
  );
}
