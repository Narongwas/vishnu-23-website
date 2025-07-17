import BingoSquare from "@/app/[locale]/games/bingo/components/BingoSquare";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import { StyleableFC } from "@/lib/types/misc";
import bingoFivePoint from "@/public/decorating/bingo/bingoFivePoint.svg";
import bingoOnePoint from "@/public/decorating/bingo/bingoOnePoint.svg";
import bingoSpecial from "@/public/decorating/bingo/bingoSpecial.svg";
import Image from "next/image";

const ScoreCard: StyleableFC<{
  isOpen: boolean;
  onClose: () => void;
  bingoData?: {
    bingo: number[];
    bingoCounter: boolean[];
  } | null;
}> = ({ isOpen, onClose, className, bingoData }) => {
  if (!isOpen) return null;

  let bonusIndexes: number[] = [];
  let bonusRevealed: boolean[] = [];
  if (bingoData && bingoData.bingo && bingoData.bingoCounter) {
    bonusIndexes = bingoData.bingo.slice(25, 28);
    bonusRevealed = bonusIndexes.map((idx) => bingoData.bingoCounter[idx - 1]);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Modal onClose={onClose} className={className}>
        <div className="flex flex-col items-center justify-center">
          <Icon name="dataset" size={24} className="text-red" />
          <div className="type-headline-small">กระดานของน้อง</div>
          <div className="flex flex-col items-center gap-2">
            <div className="type-title-medium">ช่องโบนัส</div>
            <div className="bg-blue z-10 p-2">
              <div className="grid grid-cols-3 gap-2">
                {bonusIndexes.map((clubNumber, i) => (
                  <BingoSquare
                    key={i}
                    revealed={bonusRevealed[i]}
                    clubNumber={clubNumber}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="align-center flex flex-col justify-center gap-2">
            <div className="type-title-medium">คะแนนของน้อง</div>
            <div className="flex items-center justify-center">
              <p className="type-body-medium">9</p>
              <Image
                src={bingoOnePoint}
                alt="bingoOnePoint"
                width={24}
                height={24}
                className="relative z-10 opacity-100"
              />
              <p className="items-left type-body-medium w-10">x1</p>
              <p className="items-left type-body-medium w-7">= 9</p>
            </div>
            <div className="flex items-center justify-center">
              <p className="type-body-medium">2</p>
              <Image
                src={bingoFivePoint}
                alt="bingoFivePoint"
                width={24}
                height={24}
                className="relative z-10 opacity-100"
              />
              <p className="items-left type-body-medium w-10">x5</p>
              <p className="items-left type-body-medium w-7">= 10</p>
            </div>
            <div className="flex items-center justify-center">
              <p className="type-body-medium">0</p>
              <Icon name="dataset" size={24} className="text-red" />
              <p className="items-left type-body-medium w-10">x50</p>
              <p className="items-left type-body-medium w-7">= 0</p>
            </div>
            <div className="flex items-center justify-center">
              <p className="type-body-medium">2</p>
              <Image
                src={bingoSpecial}
                alt="bingoSpecial"
                width={24}
                height={24}
                className="relative z-10 opacity-100"
              />
              <p className="items-left type-body-medium w-10">x1</p>
              <p className="items-left type-body-medium w-7">= 2</p>
            </div>
            <div className="type-body-medium">9 + 10 + 0 + 2 = 21</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ScoreCard;
