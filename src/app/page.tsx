import HomeWrapper from "@/components/HomeWrapper";
import FaqCard from "@/components/FaqCard";
import MOCK_FAQ from "@/mock/faqMock";
import Image from "next/image";
import separator from "../../public/decorating/shapes/separator.svg";
import SectionHeader from "@/components/SectionHeader";
import Accordion from "@/components/accordion/Accordion";
import { LayoutGroup } from "motion/react";

export default function Home() {
  return (
    <HomeWrapper>
      <div className="text-red mt-4 flex flex-col gap-5">
        <div className="type-title-large">
          <p>Intania First Date 2025</p>
          <p>19 กรกฎาคม 2568</p>
        </div>
        <Image src={separator} className="mx-auto" priority alt="" />
        <div className="type-title-large">
          <p>และค่ายวิษณุกรรมบุตรครั้งที่ 23</p>
          <p>22–25 กรกฎาคม 2568</p>
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
                <SectionHeader title={item.title} classname="mb-4" />
              )}
              <LayoutGroup>
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
              </LayoutGroup>
            </div>
          ))}
        </div>
      </div>
    </HomeWrapper>
  );
}
