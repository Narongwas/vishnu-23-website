"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HomeWrapper from "@/components/HomeWrapper";
import Oval from "@/components/Oval";
import separator from "@/public/decorating/shapes/separator.svg";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("HomeHero");
  const tLoginBanner = useTranslations("LogInBanner");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsOpen(true), 100);
  }, []);

  return (
    <HomeWrapper classname="h-screen">
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
      <Oval
        className={`-bottom-80 transition-opacity transition-transform duration-500 ease-in-out ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0"
        }`}
      >
        <div className="flex h-full w-full flex-col items-center justify-start gap-6 pt-8">
          <div className="text-blue type-title-large">
            {tLoginBanner("title")}
          </div>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-[20px] bg-white py-2.5 pr-6 pl-3"
          >
            <Image
              src="/logo/Google Logo.svg"
              width={16}
              height={16}
              alt="Google Logo"
              className="h-4 w-4"
            />
            <p className="text-blue type-title-small w-55">Login with Google</p>
          </button>
          <div className="text-blue type-title-small">
            ใช้บัญชีที่ลงท้ายด้วย @student.chula.ac.th
          </div>
        </div>
      </Oval>
    </HomeWrapper>
  );
}
