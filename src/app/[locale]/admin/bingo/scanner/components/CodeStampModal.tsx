"use client";

import Icon from "@/components/Icon";
import { useState } from "react";
import Button from "@/components/Button";
import { StyleableFC } from "@/lib/types/misc";

type CodeStampModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (code: string) => void;
};

const CodeStampModal: StyleableFC<CodeStampModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirmClick = async () => {
    if (!code) return;
    setLoading(true);
    await onConfirm(code);
    setLoading(false);
  };

  const handleClose = () => {
    setCode("");
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={handleClose}
        aria-label="close modal"
      />
      {/* Modal Content */}
      <div className="bg-yellow-white relative z-50 w-77 overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-4 px-6 pt-6 pb-9">
          <Icon name="pin" className="text-red" />
          <p className="type-headline-small">สแตมป์ด้วยรหัส</p>
          <div className="type-body-medium text-center">
            <span>ให้น้องไปที่หน้า </span>
            <span className="font-bold">เกม</span>
            <span className="text-red mx-1">&gt;</span>
            <span className="font-bold">บิงโก</span>
            <span className="text-red mx-1">&gt;</span>
            <span className="font-bold">QR code ของน้อง</span>
            <span> แล้วลอกรหัสมา</span>
          </div>
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
            className="w-full"
            onClick={handleClose}
            disabled={loading}
          >
            <p className="type-title-medium">ยกเลิก</p>
          </Button>
          <Button
            Size="medium"
            Appearance="primary"
            className="w-full"
            onClick={handleConfirmClick}
            disabled={loading || !code}
          >
            <p className="type-title-medium">
              {loading ? "กำลังตรวจสอบ..." : "ยืนยัน"}
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodeStampModal;
