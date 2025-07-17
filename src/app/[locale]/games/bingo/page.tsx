import BackButton from "@/app/[locale]/games/bingo//components/BackButton";
import HelpSection from "@/app/[locale]/games/bingo//components/HelpSection";
import ScoreSection from "@/app/[locale]/games/bingo//components/ScoreSection";
import BottomPage from "@/app/[locale]/games/bingo//components/bottomPage";
import BingoTable from "@/app/[locale]/games/bingo/components/BingoTable";
import SubPageHeader from "@/components/SubPageHeader";
import { getServerAuth } from "@/lib/firebase/getServerAuth";

export default async function BingoPage() {
  const { token } = await getServerAuth();

  if (!token) {
    return <div>You must be logged in to view your group.</div>;
  }

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
      <div className="z-20 flex w-full items-center justify-between px-4 pt-7">
        <BackButton />
        <HelpSection />
      </div>
      <div className="flex flex-col items-center justify-start">
        <div className="relative -top-15 flex min-h-[600px] w-full flex-col items-center">
          <SubPageHeader
            title="BINGO"
            curvedText="PLAY"
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
        <BottomPage icon="qr_code" text="Qr code ของน้อง" />
      </div>
    </>
  );
}
