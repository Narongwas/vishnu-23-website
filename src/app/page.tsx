import HomeWrapper from "@/components/HomeWrapper";
import FaqCard from "@/components/FaqCard";
import { MOCK_FAQ } from "@/jsondata/faqMock";
import Image from "next/image";
import separator from "../../public/decorating/shapes/separator.svg";

export default function Home() {
  return (
    <HomeWrapper>
      <div className="mt-12 flex flex-col gap-5 text-red">
        <div className="type-title-large font-medium">
          <p>Intania First Date 2025</p>
          <p>19 กรกฎาคม 2568</p>
        </div>
        <Image src={separator} className="mx-auto" priority alt="Separator" />
        <div className="type-title-large font-medium">
          <p>และค่ายวิษณุกรรมบุตรครั้งที่ 23</p>
          <p>22–25 กรกฎาคม 2568</p>
        </div>
      </div>

      <div className="pb-30 z-30 w-full">
        <div className="type-title-large text-center font-bold mt-17 mb-5 text-red">
          <p>คำถามที่พบบ่อย</p>
        </div>
        <div className="flex flex-col items-center gap-6">
          {MOCK_FAQ.map((item, index) => (
            <div key={index} className="w-full  ">
              {item.title.length > 0 && (
                <div className="mb-4 bg-[url('/decorating/shapes/flag.svg')] bg-no-repeat w-42 h-10">
                  <p className="type-title-medium font-bold text-left pl-7 py-2 text-white">
                    {item.title}
                  </p>
                </div>
              )}
              <div className="flex flex-col items-center w-full gap-3">
                {item.questions.map((q, qIndex) => (
                  <FaqCard
                    key={qIndex}
                    question={q.question}
                    answer={q.answer}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </HomeWrapper>
  );
}
