"use client";

import Button from "@/components/Button";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

const Dialog: StyleableFC<{
  children: React.ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
}> = ({ children, onClose, onConfirm, className, style }) => {
  return (
    <div
      className={cn(
        "bg-yellow-white fabric-texture relative w-[310px] overflow-hidden",
        className
      )}
      style={style}
    >
      <div className="flex flex-col items-center justify-center gap-4 px-6 pt-6 pb-9">
        {children}
      </div>
      <div className="flex w-full">
        <Button
          Size="medium"
          Appearance="secondary"
          onClick={onClose}
          className="w-full"
        >
          <span className="type-title-medium">ยกเลิก</span>
        </Button>
        <Button
          Size="medium"
          Appearance="primary"
          onClick={onConfirm}
          className="w-full"
        >
          <span className="type-title-medium">ยืนยัน</span>
        </Button>
      </div>
    </div>
  );
};

export default Dialog;
