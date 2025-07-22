"use client";

import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

const Modal: StyleableFC<{
  children: React.ReactNode;
  onClose: () => void;
}> = ({ children, onClose, className, style }) => {
  const texture =
    "bg-[url('/decorating/texture/fabric.png')] opacity-50 mix-blend-soft-light";
  return (
    <div
      className={cn("bg-yellow-white relative w-77 overflow-hidden", className)}
      style={style}
    >
      <div className={cn("absolute inset-0", texture)} />
      <div className="flex flex-col items-center justify-center gap-4 px-6 pt-6 pb-9">
        {children}
      </div>
      <button
        className="bg-red type-title-medium relative h-14 w-full text-white"
        onClick={onClose}
      >
        <div className={cn("absolute inset-0", texture)} />
        <span className="relative">ปิด</span>
      </button>
    </div>
  );
};

export default Modal;
