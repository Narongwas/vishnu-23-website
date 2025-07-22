import { bilingualString } from "@/lib/types/bilingual";

export type Prediction = {
  predictionId: string;
  question: bilingualString;
  solution: bilingualString;
  day: string;
  time: string;
  closeTime: string;
  typeOfAnswer: "number" | "groupName" | "any";
  showQuestion: boolean;
  enable: boolean;
  showAnswer: boolean;
};

export type PredictionHistoryItem = {
  predictionId: string;
  question: bilingualString;
  answer: string;
  solution: bilingualString;
  day: string;
  time: string;
  isCorrect: boolean;
};
