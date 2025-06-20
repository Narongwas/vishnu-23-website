"use client";

import { ciColors } from "@/themes/colors";
import styled from "styled-components";
import HomeWrapper from "@/components/HomeWrapper";
import FaqCollapse from "@/components/FaqCollapse";
import { faqMock } from "@/jsondata/faqMock";
import Image from "next/image";

const MainText = styled.div`
  color: ${ciColors.red};
`;

export default function Home() {
  return (
    <HomeWrapper>
      <MainText className="mt-[48px] flex flex-col gap-[20px]">
        <div className="title-large">
          Intania First Date 2025 <br />
          19 กรกฎาคม 2568
        </div>
        {/* <hr className="w-[160px] mx-auto border-[var(--ci-color-red)]" /> */}
        <Image
          src="/decorating/shapes/separator.svg"
          width={160}
          height={1.5}
          className="mx-auto"
          alt=""
        />
        <div className="title-large">
          และค่ายวิษณุกรรมบุตรครั้งที่ 23 <br />
          22–25 กรกฎาคม 2568
        </div>
      </MainText>

      <div className="pb-30 z-30 w-full">
        <div className="text-center text-[22px] font-bold mt-[68px] mb-[20px] text-[var(--ci-color-red)]">
          คำถามที่พบบ่อย
        </div>
        <div className="flex flex-col items-center gap-[25px]">
          {faqMock.map((item, index) => (
            <div key={index} className="w-full  ">
              {item.title.length > 0 && (
                <div className=" mb-[16px] bg-[url('/decorating/flag.svg')] bg-no-repeat w-[170px] h-[38px]">
                  <div className="title-medium text-left pl-[26px] py-[7px] text-white">
                    {item.title}
                  </div>
                </div>
              )}
              <div className="flex flex-col items-center w-full gap-[12px]">
                {item.questions.map((q, qIndex) => (
                  <FaqCollapse
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
