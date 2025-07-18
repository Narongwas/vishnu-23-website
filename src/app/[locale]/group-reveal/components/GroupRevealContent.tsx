import GroupRevealAction from "@/app/[locale]/group-reveal/components/GroupRevealAction";
import AllPageSponsorFooter from "@/components/AllPageSponsorFooter";
import BackgroundWithNoise from "@/components/BackgroundWithNoise";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { getServerAuth } from "@/lib/firebase/getServerAuth";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import cloud1Logo from "@/public/decorating/clouds/cloud1.svg";
import cloud2Logo from "@/public/decorating/clouds/cloud2.svg";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { checkFeatureFlagByName } from "@/lib/services/featureFlags.service";

const GroupRevealContent: StyleableFC = async ({ className }) => {
  const tGroupAnnouncement = await getTranslations("GroupAnnouncement");

  const { token } = await getServerAuth();

  const groupLetter = await checkFeatureFlagByName("show-group-letter");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/group`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  console.log("Group Reveal Data:", data);
  const groupInfoRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/group/info/${data.group}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  const groupInfo = groupInfoRes.ok ? await groupInfoRes.json() : null;

  return (
    <BackgroundWithNoise
      className={cn(
        "from-yellow to-yellow-white flex min-h-dvh flex-col items-center bg-gradient-to-b pb-40",
        className
      )}
    >
      <div className="relative mx-auto mt-5.5 flex h-16 w-full max-w-lg items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute top-1/2 right-0 z-20 -translate-y-1/2 pr-6">
          <Link href="/">
            <Button
              Size="small"
              Appearance="primary"
              aria-label={tGroupAnnouncement("action.home")}
              title={tGroupAnnouncement("action.home")}
            >
              <Icon name="home" />
            </Button>
          </Link>
        </div>
        {groupLetter && (
          <div className="type-headline-small w-full text-center">
            Group {data.group}
          </div>
        )}
      </div>
      <div className="flex w-full justify-center">
        <div className="relative z-10 mt-4.5">
          <Image
            src={`/group/${groupInfo.id}.webp`}
            width={286}
            height={516}
            alt="Kingdom Flag"
          />
          <Image
            src={cloud1Logo}
            width={73.5}
            height={39.5}
            alt=""
            className="absolute -top-4 -left-8"
          />
          <Image
            src={cloud2Logo}
            width={72}
            height={34.5}
            alt=""
            className="absolute -right-8 -bottom-4 z-50"
          />
        </div>
      </div>
      <div className="item relative z-10 mt-6 flex justify-center pb-8">
        <AllPageSponsorFooter />
      </div>
      <GroupRevealAction
        image="/social-icon/line.svg"
        text={tGroupAnnouncement("action.line")}
        groupInfo={groupInfo}
      />
    </BackgroundWithNoise>
  );
};

export default GroupRevealContent;
