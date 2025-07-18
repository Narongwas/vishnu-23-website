import MountainBackground from "@/components/MountainBackground";
import NavBar from "@/components/NavBar";
import NavigationCard from "@/components/NavigationCard";
import TopLevelPageHeader from "@/components/TopLevelPageHeader";
import { checkFeatureFlagByName } from "@/lib/services/featureFlags.service";
import clubs from "@/public/navigation/Clubs.png";
import map from "@/public/navigation/Map.png";
import presentation from "@/public/navigation/Presentation.png";
import { getTranslations } from "next-intl/server";

export default async function ExplorePage() {
  const t = await getTranslations("Explore");
  const presentationFlag = await checkFeatureFlagByName("slide");

  const cards = [
    {
      image: map,
      title: "Map",
      label: t("map.subtitle"),
      href: "/explore/map",
    },
    {
      image: clubs,
      title: "Clubs",
      label: t("clubs.subtitle"),
      href: "/explore/clubs",
    },
    {
      image: presentation,
      title: "Presentation",
      label: t("presentation.subtitle"),
      href: "/explore/presentation",
    },
  ];
  return (
    <>
      <TopLevelPageHeader
        title={t("tabName")}
        chineseText={t("header.chinese")}
        subtitle={t("header.subtitle")}
      />

      <MountainBackground
        className="absolute top-10 left-0 h-full w-full"
        background="bg-blue"
      />

      <div className="relative z-15 mt-4 flex w-full flex-col items-center gap-4 px-4 pb-10">
        {cards.map(
          (card, index) =>
            !(card.title === "Presentation" && !presentationFlag) && (
              <NavigationCard
                key={index}
                image={card.image}
                title={card.title}
                desc={card.label}
                variant="yellow"
                href={card.href}
              />
            )
        )}
      </div>

      <NavBar />
    </>
  );
}
