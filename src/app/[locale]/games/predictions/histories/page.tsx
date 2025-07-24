import HistorySection from "@/app/[locale]/games/predictions/histories/components/HistorySection";
import BackButton from "@/components/BackButton";
import { getTranslations } from "next-intl/server";

export default async function PredictionHistory() {
  const t = await getTranslations("Predictions.History");
  return (
    <div>
      <div className="relative z-10 flex w-full items-center justify-between p-4">
        <BackButton variant="secondary-variant" href="/games/predictions" />
        <p className="type-headline-small py-5 text-center text-white">
          {t("title")}
        </p>
        <div></div>
      </div>
      <HistorySection />
    </div>
  );
}
