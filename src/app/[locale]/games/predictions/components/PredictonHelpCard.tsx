import Modal from "@/app/[locale]/games/predictions/components/Modal";
import Icon from "@/components/Icon";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

const PredictionHelpCard: StyleableFC<{
  onClose: () => void;
}> = ({ onClose, className, style }) => {
  return (
    <Modal onClose={onClose} className={cn("z-10", className)} style={style}>
      <Icon name="temple_buddhist" className="text-red" />
      <p className="type-headline-small">หอทำนายชะตาสวรรค์</p>

      <div className="type-body-medium flex flex-col gap-2">
        <p className="type-title-medium">เล่นยังไง</p>
        <p>
          ในแต่ละวัน จะมีคำถามช่วงเช้าและช่วงบ่าย
          หน้าที่ของน้องคือการเขียนคำตอบสั้น ๆ เป็นคำทำนาย ก่อนเวลาที่กำหนด
        </p>
        <div className="flex items-center">
          <Icon name="check" className="text-red" />
          <p>20</p>
        </div>
        <div className="flex items-center">
          <Icon name="close" className="text-red" />
          <p>ผมขอตอบว่า 20 ครั้งครับ!!!</p>
        </div>
        <p>
          น้อง ๆ แต่ละคนสามารถทายตามที่ตัวเองชอบได้เลย
          โดยไม่ต้องตอบเหมือนกันทั้งก๊ก
        </p>
      </div>

      <div className="type-body-medium flex flex-col gap-2">
        <p className="type-title-medium">ให้คะแนนยังไง</p>
        <p>จะนับคะแนนจากอันดับของจำนวนน้องที่ทายถูกในก๊ก</p>
        <p>ก๊กที่มีคนตอบถูกมากที่สุด ก็จะได้คะแนนสูงสุด</p>
      </div>
    </Modal>
  );
};

export default PredictionHelpCard;
