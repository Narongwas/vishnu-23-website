import Modal from "@/components/Modal";
import cn from "@/lib/helpers/cn";
import getMe from "@/lib/helpers/getMe";
import getQrCode from "@/lib/helpers/getQrCode";
import { StyleableFC } from "@/lib/types/misc";
import defaultProfile from "@/public/decorating/profile/defaultProfile.png";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

const ScanCard: StyleableFC<{
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
}> = ({ isOpen, onClose, className }) => {
  const t = useTranslations("Bingo.QRCodeDialog");
  const [qr, setQr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState<string>("");
  const [friendCode, setFriendCode] = useState<string>("");

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    console.log("ScanCard opened");
    Promise.all([getQrCode(), getMe()])
      .then(([qrData, user]) => {
        console.log("user", user); // ตรงนี้จะปริ้นถ้า getMe() สำเร็จ
        setQr(qrData.qrcode);
        const name =
          user?.firstName && user?.lastName
            ? `${user.firstName} ${user.lastName}`
            : "";
        setFullName(name);
        setFriendCode(user?.addFriendCode || "");
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
            {t("desc")}
          </div>
          <div className="mt-2 flex items-center justify-center">
            {loading ? (
              <div className="type-body-medium text-gray">กำลังโหลด QR...</div>
            ) : qr ? (
              <div className="flex flex-col items-center bg-white">
                <Image src={qr} alt="QR Code" width={256} height={256} />
                <div className="type-title-large pb-2">{friendCode}</div>
              </div>
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
