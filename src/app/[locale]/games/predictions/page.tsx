import HelpButton from "@/app/[locale]/games/predictions/components/HelpButton";
import HistoryButton from "@/app/[locale]/games/predictions/components/HistoryButton";
import PredictionBall from "@/app/[locale]/games/predictions/components/PredictionBall";
import BackButton from "@/components/BackButton";

export default function Predictions() {
  return (
    <>
      <div className="relative z-10 flex w-full items-center justify-between p-4 lg:justify-around">
        <BackButton variants="Games" />
        <div className="flex gap-2">
          <HistoryButton />
          <HelpButton />
        </div>
      </div>
      <div className="relative flex min-h-screen flex-col items-center gap-9 px-4 text-center">
        <div className="flex w-full flex-col">
          <p className="type-title-medium text-yellow">ทำนายชะตาช่วงเช้า</p>
          <p className="type-display-small text-white">
            ในคณะวิศวฯ มีต้นจามจุรีกี่ต้น
          </p>
        </div>

        <div className="relative flex w-full justify-center">
          <div className="relative h-50 w-90">
            <PredictionBall className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="flex flex-col gap-2 pb-4 text-white">
          <p className="type-label-large">เฉลยเวลา 13:00 น.</p>
          <p className="type-body-medium">
            นับคะแนนที่ได้จากอันดับของจำนวนน้องที่ทายถูกในก๊ก
          </p>
        </div>
      </div>
    </>
  );
}
