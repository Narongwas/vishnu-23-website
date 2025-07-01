import FaqGroup from "@/components/FaqGroup";
import HomeWrapper from "@/components/HomeWrapper";
import MOCK_FAQ from "@/mock/faqMock";
import separator from "@/public/decorating/shapes/separator.svg";
import { LayoutGroup } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
  const t = useTranslations("HomeHero");

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

      <div className="z-30 w-full pb-30">
        <div className="type-title-large text-red mt-17 mb-5 text-center font-bold">
          <p>คำถามที่พบบ่อย</p>
        </div>
        <div className="flex flex-col items-center gap-6">
          <LayoutGroup>
            {MOCK_FAQ.map((section) => (
              <FaqGroup key={section.id} section={section} />
            ))}
          </LayoutGroup>
        </div>
      </div>
    </HomeWrapper>
  );
}
