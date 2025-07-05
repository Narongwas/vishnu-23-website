"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function HistoryButton() {
  const router = useRouter();
  return (
    <Button
      icon="history"
      Size="Small"
      Appearance="Primary"
      className="text-blue bg-yellow"
      onClick={() => router.push("/games/predictions/histories")}
    />
  );
}
