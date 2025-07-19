import HelpSection from "@/app/[locale]/games/bingo//components/HelpSection";
import ScoreSection from "@/app/[locale]/games/bingo//components/ScoreSection";
import BottomPage from "@/app/[locale]/games/bingo//components/bottomPage";
import BingoTable from "@/app/[locale]/games/bingo/components/BingoTable";
import AllPageSponsorFooter from "@/components/AllPageSponsorFooter";
import BackButton from "@/components/BackButton";
import SubPageHeader from "@/components/SubPageHeader";
import { getServerAuth } from "@/lib/firebase/getServerAuth";
import { checkFeatureFlagByName } from "@/lib/services/featureFlags.service";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function BingoPage() {
  const isEnabled = await checkFeatureFlagByName("bingo-game");
  if (!isEnabled) {
    redirect("/");
  }

  const { token } = await getServerAuth();
  const t = await getTranslations("Bingo");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/bingo/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();

  return (
    <>
      <div className="relative z-20 flex w-full items-center justify-between pt-7">
        <BackButton variants="secondary" className="text-black" />
        <HelpSection />
      </div>
      <div className="flex flex-col items-center justify-start">
        <div className="relative -top-15 flex min-h-[600px] w-full flex-col items-center">
          <SubPageHeader
            title={t("header.title")}
            curvedText={t("header.parent")}
            background="bg-blue mix-blend-hard-light"
            cloudcolor="yellow"
            curveTextColor="fill-white"
            className="text-white"
          />
          <div className="absolute top-90 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <BingoTable bingoData={data} />
          </div>
        </div>
        <ScoreSection className="-mt-25" bingoData={data} />
        <AllPageSponsorFooter className="relative z-10 pt-20 text-white" />
        <BottomPage icon="qr_code" text={t("action.qr")} />
      </div>
    </>
  );
}
