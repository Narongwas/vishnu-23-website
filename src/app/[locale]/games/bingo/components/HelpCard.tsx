import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import { StyleableFC } from "@/lib/types/misc";
import bingoFivePoint from "@/public/decorating/bingo/bingoFivePoint.svg";
import bingoOnePoint from "@/public/decorating/bingo/bingoOnePoint.svg";
import bingoSpecial from "@/public/decorating/bingo/bingoSpecial.svg";
import Image from "next/image";

const HelpCard: StyleableFC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose, className }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Modal onClose={onClose} className={className}>
        <div className="flex flex-col items-center justify-center gap-4">
          <Icon name="dataset" size={24} className="text-red" />
          <div className="type-headline-small">บิงโก</div>
          <div className="flex flex-col items-start gap-2">
            <div className="type-title-medium">เล่นยังไง</div>
            <div className="type-body-medium">
              เริ่มต้นจะมีตารางบิงโก 5×5 ที่ถูกซ่อนไว้ เมื่อเล่นจบ 9
              ไปที่ชนะมาไหน ก็เปิด QR code ให้เพื่อนร่วมทีมสแกนแทน
              และระบบจะสุ่มเปิดช่องของบิงโก
            </div>
          </div>
          <div className="align-center flex flex-col justify-center gap-2">
            <div className="type-title-medium">ให้คะแนนยังไง</div>
            <div className="flex items-center justify-center gap-2">
              <Image
                src={bingoOnePoint}
                alt="bingoOnePoint"
                width={24}
                height={24}
                className="relative z-10 opacity-100"
              />
              <p className="type-body-medium">
                แต่ละช่องที่ถูกเปิด จะได้ช่องละ 1 คะแนน
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Image
                src={bingoFivePoint}
                alt="bingoFivePoint"
                width={24}
                height={24}
                className="relative z-10 opacity-100"
              />
              <p className="type-body-medium">
                เมื่อได้ทั้งแถวหรือแนวทแยง จะได้รับคะแนนเพิ่มแถวละ 5 คะแนน
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Icon name="dataset" size={24} className="text-red" />
              <p className="type-body-medium">
                เมื่อเก็บครบทั้งตาราง จะได้รับเพิ่มอีก 50 คะแนน
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Image
                src={bingoSpecial}
                alt="bingoSpecial"
                width={24}
                height={24}
                className="relative z-10 opacity-100"
              />
              <p className="type-body-medium">
                ถ้าสแกนแล้วไม่ตรงช่องไหนเลย ก็จะได้รับคะแนนโบนัส
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HelpCard;
