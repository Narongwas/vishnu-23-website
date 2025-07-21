import { bilingualString } from "@/lib/types/bilingual";

export type leaderboardPrediction = {
  question: bilingualString;
  day: string;
  time: string;
  leaderboard: {
    group: string;
    name: string;
    correctCount: number;
  }[];
};
