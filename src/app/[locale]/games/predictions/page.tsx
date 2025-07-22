import HelpButton from "@/app/[locale]/games/predictions/components/HelpButton";
import HistoryButton from "@/app/[locale]/games/predictions/components/HistoryButton";
import PredictionControl from "@/app/[locale]/games/predictions/components/PredictionControl";
import BackButton from "@/components/BackButton";

export default function Predictions() {
  return (
    <>
      <div className="relative z-10 flex w-full items-center justify-between py-4">
        <BackButton variant="secondary-variant" />
        <div className="flex gap-2">
          <HistoryButton />
          <HelpButton />
        </div>
      </div>
      <PredictionControl />
    </>
  );
}
