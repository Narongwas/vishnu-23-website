import Icon from "@/components/Icon";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

type HistoryProps = {
  time?: string;
  question?: string;
  userAnswer?: string;
  correctAnswer?: string;
  isCorrect?: boolean;
};

const HistoryCard: StyleableFC<{ history: HistoryProps }> = ({
  history,
  className,
  style,
}) => {
  return (
    <div
      className={cn(
        "bg-blue relative flex h-28 w-full flex-col gap-3 p-4",
        className
      )}
      style={style}
    >
      <div
        className={cn(
          "absolute inset-0 bg-[url('/decorating/texture/fabric.png')] opacity-50 mix-blend-soft-light"
        )}
      />
      <div>
        <p className="type-title-medium text-yellow">{history.time}</p>
        <p className="type-body-medium text-white">{history.question}</p>
      </div>
      <div className="flex justify-between">
        <div>
          <span className="type-title-medium pr-2 text-white">
            {history.userAnswer}
          </span>
          {!history.isCorrect && (
            <span className="type-title-medium text-yellow">
              เฉลย: {history.correctAnswer}
            </span>
          )}
        </div>
        <Icon
          name={history.isCorrect ? "check" : "close"}
          className="text-white"
        />
      </div>
    </div>
  );
};

export default HistoryCard;
