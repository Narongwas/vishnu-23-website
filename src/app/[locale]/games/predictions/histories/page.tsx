import HistoryCard from "@/app/[locale]/games/predictions/histories/components/HistoryCard";
import BackButton from "@/components/BackButton";

const MOCK_HISTORY = [
  {
    id: 1,
    time: "Day 1 ช่วงบ่าย",
    question: "ในคณะวิศวฯ มีต้นจามจุรีกี่ต้น",
    userAnswer: "20",
    correctAnswer: "15",
    isCorrect: false,
  },
  {
    id: 2,
    time: "Day 2 ช่วงเช้า",
    question: "ในคณะวิศวฯ มีต้นจามจุรีกี่ต้น",
    userAnswer: "20",
    correctAnswer: "15",
    isCorrect: true,
  },
];

export default function PredictionHistory() {
  return (
    <div>
      <div className="relative z-10 flex w-full items-center justify-between p-4">
        <BackButton variants="secondary-variant" />
        <p className="type-headline-small py-5 text-center text-white">
          ประวัติการทำนาย
        </p>
        <div></div>
      </div>
      <div className="space-y-3 p-4">
        {MOCK_HISTORY.map((history) => (
          <HistoryCard key={history.id} history={history} />
        ))}
      </div>
    </div>
  );
}
