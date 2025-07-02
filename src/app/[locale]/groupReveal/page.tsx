import BackgroundWithNoise from "@/components/BackgroundWithNoise";
import Button from "@/components/Button";
import cn from "@/lib/helpers/cn";
import cloud1Logo from "@/public/decorating/clouds/cloud1.svg";
import cloud2Logo from "@/public/decorating/clouds/cloud2.svg";
import Image from "next/image";
import AnimatedPageAction from "@/app/[locale]/groupReveal/components/AnimatedPageAction";
import Link from "next/link";

export default function Page() {
  const group = "Group A";
  const flagText = "ก๊กกะใจ";
  return (
    <BackgroundWithNoise
      className={cn(
        "from-yellow to-yellow-white flex min-h-dvh flex-col items-center bg-gradient-to-b pb-40"
      )}
    >
      <div className="mx-auto mt-5.5 flex w-full max-w-lg items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="w-10 flex-shrink-0" />
        <div className="flex flex-1 justify-center">
          <div className="type-headline-small">
            {group} {"/"} {flagText}
          </div>
        </div>
        <Link href="/">
          <Button
            icon="home"
            Size="Small"
            Appearance="Primary"
            aria-label="home"
            title="home"
          />
        </Link>
      </div>
      <div className="mt-4.5 flex w-full justify-center">
        <div className="relative">
          <Image
            src="/decorating/image/kingdomFlag.png"
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
      <AnimatedPageAction text="/logo/SocialIcon.svg" label="เข้ากลุ่ม Line" />
    </BackgroundWithNoise>
  );
}
