"use client";

import { useRouter } from "next/navigation";

type BackButtonProps = {
  bgColor?: string;
  iconColor?: string;
};

export default function BackButton({
  bgColor = "var(--color-yellow)",
  iconColor = "var(--color-red)",
}: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      style={{
        position: "absolute",
        top: "2.5rem",
        left: "1rem",
        width: "2.75rem",
        height: "2.75rem",
        backgroundColor: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        className="font-icon"
        style={{ color: iconColor, fontSize: "1.25rem" }}
      >
        arrow_back
      </span>
    </button>
  );
}
