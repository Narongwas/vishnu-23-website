export type FaqQuestion = {
  question: string;
  answer: string;
};

export type FaqSection = {
  title: string;
  questions: FaqQuestion[];
};
