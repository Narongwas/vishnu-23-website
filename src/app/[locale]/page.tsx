import FaqLayoutGroup from "@/components/FaqLayoutGroup";
import HomeWrapper from "@/components/HomeWrapper";
import separator from "@/public/decorating/shapes/separator.svg";
import { useTranslations } from "next-intl";
import Image from "next/image";

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
      </div>

      <FaqLayoutGroup />
    </HomeWrapper>
  );
}
