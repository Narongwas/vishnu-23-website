"use client";

import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import BackButton from "@/components/BackButton";
import Kingdom from "@/components/Kingdom";

interface RegistrationData {
  firstdate: string;
  packageNumber: number;
  vishnu: string;
}

const RegistrationInfo: StyleableFC = ({ className, style }) => {
  const locale = useLocale();
  const t = useTranslations("Registration");

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [registrationData, setRegistrationData] =
    useState<RegistrationData | null>(null);
  const [group, setGroup] = useState<string>("");

  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (id) {
          res = await fetch(`/api/v1/registrationPoint/${id}`);
        } else if (token) {
          res = await fetch(`/api/v1/registrationPoint`);
        } else {
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch registration data");
        const data = await res.json();
        setRegistrationData(data.registrationsPoint);
        setGroup(data.groupName || "");
      } catch (error) {
        console.error("Error fetching data:", error);
        router.push("/registration");
        alert("ไม่พบข้อมูลการลงทะเบียน กรุณาลองใหม่อีกครั้ง");
      }
    };

    fetchData();
  }, [id, token, router]);

  if (!registrationData) return null;

  const realImg = `/registration/picture/Img-${registrationData.vishnu}.jpg`;
  const locationImg = `/registration/point-${locale}/Point-${registrationData.vishnu}.png`;

  return (
    <>
      <div className="relative flex w-full items-center justify-between py-4">
        <BackButton variant="tertiary" />
        <div className="flex w-full flex-col items-center justify-center">
          <p className="type-headline-small">
            {t("Result.title", {
              package: `${registrationData.packageNumber}`,
            })}
          </p>
          <p className="type-title-medium text-red">
            <Kingdom letter={group.toLowerCase()} prefixed />
          </p>
        </div>
        <div className="w-8"></div>
      </div>
      <div className={cn("mt-4 px-5", className)} style={style}>
        <div className="mb-10 flex w-full flex-col items-center gap-3">
          <div className="relative w-full">
            <Image
              src={locationImg}
              alt=""
              width={491}
              height={336}
              priority
              className="relative mb-3 h-full w-full"
            />
            <Image
              src={realImg}
              alt=""
              width={491}
              height={336}
              priority
              className="h-full w-full"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-5">
          <p className="type-body-large">
            {t.rich("Result.footer.0", {
              point: registrationData.vishnu,
              package: registrationData.packageNumber,
              location: (chunks) => <span className="font-bold">{chunks}</span>,
              time: (chunks) => <span className="font-bold">{chunks}</span>,
            })}
          </p>
          <p className="type-body-medium w-50">{t("Result.footer.1")}</p>
        </div>
      </div>
    </>
  );
};

export default RegistrationInfo;
