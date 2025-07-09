import BackButton from "@/app/[locale]/games/bingo//components/BackButton";
import HelpSection from "@/app/[locale]/games/bingo//components/HelpSection";
import ScoreSection from "@/app/[locale]/games/bingo//components/ScoreSection";
import BottomPage from "@/app/[locale]/games/bingo//components/bottomPage";
import BingoTable from "@/app/[locale]/games/bingo/components/BingoTable";
import SubPageHeader from "@/components/SubPageHeader";

export default function BingoPage() {
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
            <BingoTable />
          </div>
        </div>
        <ScoreSection score={0} className="-mt-25" />
        <BottomPage icon="qr_code" text="Qr code ของน้อง" />
      </div>
    </>
  );
}
