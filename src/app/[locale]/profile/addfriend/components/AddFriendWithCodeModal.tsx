"use client";

import Icon from "@/components/Icon";
import Button from "@/components/Button";
import { useState } from "react";
import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import { useTranslations } from "next-intl";

interface AddFriendWithCodeModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: (code: string) => void;
  className?: string;
}

const AddFriendWithCodeModal: StyleableFC<AddFriendWithCodeModalProps> = ({
  isOpen = true,
  onClose,
  onConfirm,
  className,
}) => {
  const t = useTranslations("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirmClick = async () => {
    if (!code) return;
    setLoading(true);
    if (onConfirm) await onConfirm(code);
    setLoading(false);
  };

  const handleClose = () => {
    setCode("");
    setLoading(false);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80"
        onClick={handleClose}
        aria-label="close modal"
      />
      {/* Modal Content */}
      <div
        className={cn(
          "bg-yellow-white relative z-50 w-80 overflow-hidden shadow-lg",
          className
        )}
      >
        <div className="flex flex-col items-center justify-center gap-4 px-6 pt-6 pb-9">
          <Icon name="pin" className="text-red" />
          <p className="type-headline-small">
            {t("Profile.FriendCodeDialog.title")}
          </p>
          <p className="type-body-medium text-start">
            {t.rich("Profile.FriendCodeDialog.desc", {
              strong: (chunks) => (
                <strong className="font-bold">{chunks}</strong>
              ),
            })}
          </p>
          <input
            type="text"
            placeholder="รหัส"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="type-body-large w-full bg-white px-5 py-4"
          />
        </div>
        <div className="flex">
          <Button
            Size="medium"
            Appearance="secondary"
            className="w-full rounded-none"
            onClick={handleClose}
            disabled={loading}
          >
            <p className="type-title-medium">{t("Common.Action.cancel")}</p>
          </Button>
          <Button
            Size="medium"
            Appearance="primary"
            className="w-full rounded-none"
            onClick={handleConfirmClick}
            disabled={loading || !code}
          >
            <p className="type-title-medium">
              {loading ? "กำลังตรวจสอบ..." : t("Common.Action.confirm")}
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddFriendWithCodeModal;
