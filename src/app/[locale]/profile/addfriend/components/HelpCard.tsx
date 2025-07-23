"use client";

import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import { StyleableFC } from "@/lib/types/misc";
import { useTranslations } from "next-intl";
import Image from "next/image";

const HelpCard: StyleableFC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose, className }) => {
  const t = useTranslations("Profile.QRHelpDialog");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Modal onClose={onClose} className={className}>
        <div className="flex flex-col items-center justify-center gap-4">
          <Icon name="qr_code_scanner" size={24} className="text-red" />
          <div className="type-headline-small">{t("title")}</div>
          <div className="flex flex-col items-start gap-4">
            <div className="type-body-medium">
              {t.rich("desc.0", {
                strong: (chunks) => <b>{chunks}</b>,
              })}
            </div>
            <div>
              <Image
                src="/decorating/profile/addFriendArt.png"
                alt="Add Friend Help Image"
                width={262}
                height={131}
              />
            </div>
            <div className="type-body-medium">
              {t.rich("desc.1", {
                br: () => <br />,
              })}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HelpCard;
