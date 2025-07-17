import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import Modal from "@/components/Modal";
import Icon from "@/components/Icon";

const ScanCard: StyleableFC<{
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
}> = ({ isOpen, onClose, className }) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/40",
        className
      )}
    >
      <Modal onClose={onClose ?? (() => {})} className={className}>
        <div className="flex flex-col items-center justify-center gap-4">
          <Icon name="qr_code_scanner" size={48} className="text-blue" />
          <div className="type-headline-small">สแกน QR Card</div>
          <div className="type-body-medium text-center text-gray-600">
            กรุณาสแกน QR code จากบัตรของน้อง
            <br />
            เพื่อรับคะแนนหรือสิทธิ์พิเศษ
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ScanCard;
