export type FaqQuestion = {
  id: number;
  question: string;
  answer: string;
};

export type FaqSection = {
  id: number;
  title: string;
  questions: FaqQuestion[];
};
