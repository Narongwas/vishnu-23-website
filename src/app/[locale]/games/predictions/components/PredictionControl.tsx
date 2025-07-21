"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import cn from "@/lib/helpers/cn";
import type { bilingualString } from "@/lib/types/bilingual";
import type { StyleableFC } from "@/lib/types/misc";
import type { Prediction, PredictionHistoryItem } from "@/lib/types/prediction";

import AnswerCard from "@/app/[locale]/games/predictions/components/AnswerCard";
import PredictionBall from "@/app/[locale]/games/predictions/components/PredictionBall";
import MountainBackground from "@/components/MountainBackground";

const PredictionControl: StyleableFC = ({ className, style }) => {
  const locale = useLocale() as "th" | "en";
  const t = useTranslations("Predictions");

  const [question, setQuestion] = useState<bilingualString | null>(null);
  const [showAnswerText, setShowAnswerText] = useState<bilingualString | null>(
    null
  );
  const [predictionItem, setPredictionItem] = useState<Prediction | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [showAnswerCard, setShowAnswerCard] = useState(true);
  const [history, setHistory] = useState<PredictionHistoryItem>();

  const time = predictionItem?.time === "เช้า" ? "morning" : "afternoon";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/v1/prediction");
        if (!res.ok) throw new Error("Failed to fetch prediction data");

        const { predictions }: { predictions: Prediction[] } = await res.json();

        const enabledPrediction = predictions.find((p) => p.showQuestion);
        const enabledAnswer = predictions.find((p) => p.showAnswer);

        if (enabledPrediction) {
          setQuestion(enabledPrediction.question);
          setPredictionItem(enabledPrediction);

          try {
            const response = await fetch(
              `/api/v1/prediction/answer?prediction=${enabledPrediction.predictionId}`
            );
            const historyData = await response.json();

            if (historyData) {
              setUserAnswer(historyData.answer);
              setHistory(historyData);
              setIsAnswered(true);
            }
          } catch (error) {
            console.error("Error fetching answer history:", error);
          }
        }

        if (enabledAnswer) {
          setShowAnswerText(enabledAnswer.solution);
        }
      } catch (error) {
        console.error("Error fetching prediction data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!predictionItem) return;

    const url = isAnswered
      ? "/api/v1/prediction/answer"
      : "/api/v1/prediction/history";
    const method = isAnswered ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prediction: predictionItem.predictionId,
          answer: userAnswer.trim(),
        }),
      });

      if (res.ok) {
        const message = isAnswered
          ? "Answer updated successfully."
          : "Prediction submitted successfully.";
        if (res.status !== 204) {
          await res.json(); // just to consume the body
        }
        alert(message);
        setUserAnswer("");
        setIsAnswered(true);
      } else {
        let errorMsg = isAnswered
          ? "Failed to update answer"
          : "Failed to submit prediction";
        try {
          const errData = await res.json();
          errorMsg = errData.error || errorMsg;
        } catch {}
        console.error(errorMsg);
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  useEffect(() => {
    if (!predictionItem?.predictionId || !showAnswerText) return;

    const key = `show answer of ${predictionItem.predictionId}`;
    const hasShown = sessionStorage.getItem(key);

    if (!hasShown) {
      setShowAnswerCard(true);
      sessionStorage.setItem(key, "true");
    } else {
      setShowAnswerCard(false);
    }
  }, [showAnswerText, predictionItem?.predictionId]);

  return (
    <>
      <div
        className={cn(
          "flex h-dvh w-full flex-col items-center justify-between pb-50 text-center",
          className
        )}
        style={style}
      >
        <div className="flex w-full flex-col">
          <p className="type-title-medium text-yellow">
            {t("overline", { time })}
          </p>
          <p className="type-headline-medium text-white">
            {question?.[locale] ?? ""}
          </p>
        </div>

        <PredictionBall
          enable={predictionItem?.enable ?? false}
          value={userAnswer}
          onChange={setUserAnswer}
          onSubmit={handleSubmit}
        />

        <div className="flex flex-col gap-2 pb-4 text-white">
          <p className="type-label-large">
            {t("footer.closedTime", { time: predictionItem?.closeTime ?? "" })}
          </p>
          <p className="type-body-medium">{t("footer.scoring")}</p>
        </div>

        <MountainBackground className="absolute top-25 left-0 h-full w-full mask-b-from-30% mask-b-to-55% opacity-50" />
      </div>

      {showAnswerText && showAnswerCard && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <AnswerCard
            onClose={() => setShowAnswerCard(false)}
            answer={history}
          />
        </div>
      )}
    </>
  );
};

export default PredictionControl;
