import Icon from "@/components/Icon";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

const Score: StyleableFC<{
  score: number;
}> = ({ score, className }) => {
  return (
    <div className={cn("flex justify-center gap-1 pt-5", className)}>
      <span className="type-title-large text-white">{score} คะแนน</span>
      <div className="flex items-center">
        <Icon
          name="chevron_right"
          size={24}
          className="align-center text-white"
        />
      </div>
    </div>
  );
};

export default Score;
