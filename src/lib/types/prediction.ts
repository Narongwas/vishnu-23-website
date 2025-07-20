import { bilingualString } from "@/lib/types/bilingual";

export type Prediction = {
  predictionId: string;
  question: bilingualString;
  solution: bilingualString;
  day: string;
  time: string;
  showQuestion: boolean;
  enable: boolean;
  showAnswer: boolean;
};
