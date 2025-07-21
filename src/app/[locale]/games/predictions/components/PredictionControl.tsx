"use client";

import PredictionBall from "@/app/[locale]/games/predictions/components/PredictionBall";
import MountainBackground from "@/components/MountainBackground";
import PageAction from "@/components/PageAction";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import type { Prediction } from "@/lib/types/prediction";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const PredictionControl: StyleableFC = ({ className, style }) => {
  const [question, setQuestion] = useState("");
  const [showAnswer, setShowAnswer] = useState("");
  // const [userAnswer, setUserAnswer] = useState("");
  const [predictionItems, setPredictionItems] = useState<Prediction>();
  console.log(question);
  console.log(showAnswer);
  console.log(predictionItems);

  // const lang = useLocale();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/v1/prediction", {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch prediction data");
        }
        const data: { predictions: Prediction[] } = await res.json();
        const enabledPrediction = data.predictions.find(
          (p) => p.enable === true
        );

        if (enabledPrediction) {
          setQuestion(enabledPrediction.question); // or setQuestion(enabledPrediction)
        } else {
          console.warn("No enabled prediction found");
        }

        setPredictionItems(enabledPrediction);

        const enabledAnswer = data.predictions.find(
          (p) => p.showAnswer === true
        );
        if (enabledAnswer) {
          setShowAnswer(enabledAnswer.solution); // or setShowAnswer(enabledAnswer)
        } else {
          console.warn("No enabled answer found");
        }
      } catch (error) {
        console.error("Error fetching prediction data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className={cn(
        "flex h-dvh w-full flex-col items-center justify-between pb-50 text-center",
        className
      )}
      style={style}
    >
      <div className="flex w-full flex-col">
        <p className="type-title-medium text-yellow">
          ทำนายชะตาช่วง{predictionItems?.time}
        </p>
        <p className="type-headline-medium text-white">{question}</p>
      </div>
      <PredictionBall />

      <div className="flex flex-col gap-2 pb-4 text-white">
        <p className="type-label-large">ปิดรับคำตอบ 13:00 น.</p>
        <p className="type-body-medium">
          นับคะแนนที่ได้จากอันดับของจำนวนน้องที่ทายถูกในก๊ก
        </p>
      </div>
      <MountainBackground className="absolute top-25 left-0 h-full w-full mask-b-from-30% mask-b-to-55% opacity-50" />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeIn",
        }}
        className="fixed -bottom-95 left-1/2 z-5 -translate-x-1/2"
      >
        <PageAction
          icon="check"
          text="ทำนาย"
          onClick={() => console.log("clicked")}
        />
      </motion.div>
    </div>
  );
};

export default PredictionControl;
