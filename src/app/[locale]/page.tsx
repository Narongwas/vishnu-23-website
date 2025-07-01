import HomeWrapper from "@/components/HomeWrapper";
import FaqCard from "@/components/FaqCard";
import MOCK_FAQ from "@/mock/faqMock";
import Image from "next/image";
import separator from "@/public/decorating/shapes/separator.svg";
import SectionHeader from "@/components/SectionHeader";
import Accordion from "@/components/AccordionGroup/Accordion";
// import { LayoutGroup } from "motion/react";
import { useTranslations } from "next-intl";

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
        <div className="type-title-large-bold text-red mt-17 mb-5 text-center">
          <p>คำถามที่พบบ่อย</p>
        </div>
        <div className="flex flex-col items-center gap-6">
          {MOCK_FAQ.map((item, index) => (
            <div key={index} className="w-full">
              {item.title.length > 0 && (
                <SectionHeader title={item.title} className="mb-4" />
              )}
              {/* <LayoutGroup> */}
              <Accordion
                type="multiple"
                className="flex w-full flex-col items-center gap-3 px-4"
              >
                {item.questions.map((q, qIndex) => (
                  <FaqCard
                    key={qIndex}
                    question={q.question}
                    answer={q.answer}
                    value={`faq-${index}-${qIndex}`} //unique value
                  />
                ))}
              </Accordion>
              {/* </LayoutGroup> */}
            </div>
          ))}
        </div>
      </div>
    </HomeWrapper>
  );
}
