"use client";

import { useRouter } from "next/navigation";

type BackButtonProps = {
  bgColorClass?: string;
  iconColorClass?: string;
};

export default function BackButton({
  bgColorClass = "bg-yellow",
  iconColorClass = "text-red",
}: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`absolute top-10 left-4 w-11 h-11 flex items-center justify-center ${bgColorClass}`}
      type="button"
    >
      <span className={`font-icon ${iconColorClass} text-icon-size`}>
        arrow_back
      </span>
    </button>
  );
}
