import Accordion from "@/components/Accordion";
import HomeWrapper from "@/components/HomeWrapper";
import MOCK_FAQ from "@/mock/faqMock";
import separator from "@/public/decorating/shapes/separator.svg";
import { LayoutGroup } from "motion/react";
import Image from "next/image";

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
          <LayoutGroup>
            {MOCK_FAQ.map((q, index) => (
              <Accordion key={index} questions={q.questions} title={q.title} />
            ))}
          </LayoutGroup>
        </div>
      </div>
    </HomeWrapper>
  );
}
