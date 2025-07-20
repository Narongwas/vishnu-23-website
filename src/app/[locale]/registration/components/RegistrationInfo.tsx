"use client";

import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

interface RegistrationData {
  firstdate: string;
  packageNumber: number;
  vishnu: string;
}

const RegistrationInfo: StyleableFC = ({ className, style }) => {
  const locale = useLocale();
  const t = useTranslations("RegistrationAnnouncement");
  const [registrationData, setRegistrationData] =
    useState<RegistrationData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/v1/registrationPoint`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setRegistrationData(data.registrationsPoint);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const realImg = registrationData
    ? `/registration/picture/Img-${registrationData.firstdate}.jpg`
    : "";
  const locationImg = registrationData
    ? `/registration/point-${locale}/Point-${registrationData.firstdate}.png`
    : "";

  if (!registrationData) return null;

  return (
    <div className={cn("mt-4 px-5", className)} style={style}>
      <div className="mb-10 flex w-full flex-col items-center gap-3">
        <div className="relative w-full">
          <Image
            src={locationImg}
            alt={t(`point.${registrationData.firstdate}`)}
            width={491}
            height={336}
            priority
            className="relative mb-3 h-full w-full"
          />
          <Image
            src={realImg}
            alt={t(`point.${registrationData.firstdate}`)}
            width={491}
            height={336}
            priority
            className="h-full w-full"
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-5">
        <p className="type-body-large">
          {t.rich("footer.0", {
            location: () => (
              <span className="font-bold">
                {t(`point.${registrationData.firstdate}`)} (#
                {registrationData.packageNumber})
              </span>
            ),
            time: () => <span className="font-bold">{t("time")}</span>,
          })}
        </p>
        <p className="type-body-medium w-50">{t("footer.1")}</p>
      </div>
    </div>
  );
};

export default RegistrationInfo;
