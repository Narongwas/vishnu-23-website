"use client";

import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";

const Modal: StyleableFC<{
  children: React.ReactNode;
  onClose: () => void;
}> = ({ children, onClose, className, style }) => {
  const t = useTranslations("Common.Action");

  return (
    <div
      className={cn(
        "bg-yellow-white fabric-texture relative w-77.5 overflow-hidden",
        className
      )}
      style={style}
    >
      <div className="fabric-texture absolute inset-0" />
      <div className="flex flex-col items-center justify-center gap-4 px-6 pt-6 pb-9">
        {children}
      </div>
      <Button
        Appearance="primary"
        Size="medium"
        className="w-full"
        onClick={onClose}
      >
        <span className="type-title-medium">{t("close")}</span>
      </Button>
    </div>
  );
};

export default Modal;
