"use client";

import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import FacultyMapEN from "@/public/map/Faculty-en.png";
import FacultyMapTH from "@/public/map/Faculty-th.png";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

import Icon from "@/components/Icon";

interface RegistrationData {
  firstdate: string;
  packageNumber: number;
  vishnu: string;
}

const position: Record<string, string> = {
  EN100: "top-18 right-10",
  ENG3: "top-7 left-40",
  Ruamjai: "top-5 left-14",
  Larngear: "top-7 right-20",
  ENG4: "bottom-15 right-10.5",
};

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

  const facultyMap = locale === "th" ? FacultyMapTH : FacultyMapEN;

  const realImg = registrationData
    ? `/registration/Img-${registrationData.firstdate}.jpg`
    : "";

  if (!registrationData) return null;

  return (
    <div className={cn("mt-4 px-5", className)} style={style}>
      <div className="mb-10 flex w-full flex-col items-center gap-3">
        <div className="relative">
          <Image
            src={facultyMap}
            alt={t(`point.${registrationData.firstdate}`)}
            width={200}
            height={200}
            priority
            className="relative mb-3 h-full w-full"
          />
          <div
            className={cn(
              "bg-yellow-white absolute flex h-10 w-10 items-center justify-center rounded-full",
              position[registrationData.firstdate]
            )}
          >
            <Icon name="location_on" size={24} className="text-red" />
          </div>
          <Image
            src={realImg}
            alt={t(`point.${registrationData.firstdate}`)}
            width={200}
            height={200}
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
                {t(`point.${registrationData.firstdate}`)}
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
