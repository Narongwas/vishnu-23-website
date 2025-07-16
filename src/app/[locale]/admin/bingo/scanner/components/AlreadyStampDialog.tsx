import Modal from "@/components/Modal";
import Icon from "@/components/Icon";

type AlreadyStampDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AlreadyStampDialog = ({ isOpen, onClose }: AlreadyStampDialogProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="close modal"
      />
      {/* Modal Content */}
      <div className="relative z-50">
        <Modal onClose={onClose}>
          <Icon name="person_alert" className="text-red" />
          <div className="type-headline-small">คนนี้ได้รับสแตมป์ไปแล้ว</div>
          <div className="type-body-medium">
            เราตรวจสอบได้ว่า QR code ถูกใช้งานไป แล้วสำหรับชมรมนี้
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AlreadyStampDialog;
