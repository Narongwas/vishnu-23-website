import { getServerAuth } from "@/lib/firebase/getServerAuth";
import BackgroundWithNoise from "@/components/BackgroundWithNoise";
import Button from "@/components/Button";
import cn from "@/lib/helpers/cn";
import cloud1Logo from "@/public/decorating/clouds/cloud1.svg";
import cloud2Logo from "@/public/decorating/clouds/cloud2.svg";
import Image from "next/image";
import AnimatedPageAction from "@/app/[locale]/group-reveal/components/AnimatedPageAction";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

//This is a template for fetching group
export default async function GroupReveal() {
  const t = await getTranslations("kokname");
  const tGroupAnnouncement = await getTranslations("GroupAnnouncement");

  const { token } = await getServerAuth();

  if (!token) {
    return <div>You must be logged in to view your group.</div>;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/group`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>Failed to fetch group info</div>;
  }

  const data = await res.json();

  return (
    <BackgroundWithNoise
      className={cn(
        "from-yellow to-yellow-white flex min-h-dvh flex-col items-center bg-gradient-to-b pb-40"
      )}
    >
      <div className="relative mx-auto mt-5.5 flex h-16 w-full max-w-lg items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* ปุ่ม home ลอยขวาบน */}
        <div className="absolute top-1/2 right-0 z-20 -translate-y-1/2 pr-6">
          <Link href="/">
            <Button
              icon="home"
              Size="Small"
              Appearance="Primary"
              aria-label={tGroupAnnouncement("action.home")}
              title={tGroupAnnouncement("action.home")}
            />
          </Link>
        </div>
        {/* ข้อความอยู่กลาง container */}
        <div className="type-headline-small w-full text-center">
          {t(data.group)}
        </div>
      </div>
      <div className="relative z-10 mt-4.5 flex w-full justify-center">
        <div className="relative">
          <Image
            src={`/group/${data.group}.webp`}
            width={256}
            height={256}
            alt="Kingdom Flag"
          />
          <Image
            src={cloud1Logo}
            width={73.5}
            height={39.5}
            alt=""
            className="absolute -top-4 -left-8 opacity-100"
          />
          <Image
            src={cloud2Logo}
            width={72}
            height={34.5}
            alt=""
            className="absolute -right-8 -bottom-4 z-50 opacity-100"
          />
        </div>
      </div>
      <AnimatedPageAction
        text="/logo/SocialIcon.svg"
        label={tGroupAnnouncement("action.line")}
      />
    </BackgroundWithNoise>
  );
}
