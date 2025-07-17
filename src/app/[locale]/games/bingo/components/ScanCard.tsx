import { useEffect, useState } from "react";
import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import Modal from "@/components/Modal";
import defaultProfile from "@/public/decorating/profile/defaultProfile.png";
import Image from "next/image";
import getQrCode from "@/lib/helpers/getQrCode";
import getMe from "@/lib/helpers/getMe";

const ScanCard: StyleableFC<{
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
}> = ({ isOpen, onClose, className }) => {
  const [qr, setQr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState<string>("");

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    Promise.all([getQrCode(), getMe()])
      .then(([qrData, user]) => {
        setQr(qrData.qrcode);
        const name =
          user?.firstName && user?.lastName
            ? `${user.firstName} ${user.lastName}`
            : "";
        setFullName(name);
      })
      .catch(() => {
        setQr(null);
        setFullName("สแกน QR Card");
      })
      .finally(() => setLoading(false));
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/40",
        className
      )}
    >
      <Modal onClose={onClose ?? (() => {})}>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="h-18 w-18 overflow-hidden rounded-full">
            <Image src={defaultProfile} alt="Default Profile" />
          </div>
          <div className="type-title-large">{fullName}</div>
          <div className="type-body-medium text-center text-black">
            ยื่น QR code นี้ให้กับพี่ประจำชมรม
            <br />
            เพื่อรับคะแนนจากช่องบิงโก
          </div>
          <div className="mt-2 flex items-center justify-center">
            {loading ? (
              <div className="type-body-medium text-gray-400">
                กำลังโหลด QR...
              </div>
            ) : qr ? (
              <Image src={qr} alt="QR Code" width={256} height={256} />
            ) : (
              <div className="type-body-medium text-red-500">
                ไม่สามารถโหลด QR ได้
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ScanCard;
