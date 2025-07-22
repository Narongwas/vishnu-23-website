import { bilingualString } from "@/lib/types/bilingual";

export function checkAnswer(
  answer: string,
  solution: bilingualString
): boolean {
  // Normalize both answer and solution to lowercase for case-insensitive comparison
  return (
    answer.trim().toLowerCase() === solution.en ||
    answer.trim().toLowerCase() === solution.th
  );
}
