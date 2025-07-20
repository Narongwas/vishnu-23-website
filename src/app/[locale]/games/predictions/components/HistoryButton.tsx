"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { useRouter } from "next/navigation";

export default function HistoryButton() {
  const router = useRouter();
  return (
    <Button
      Size="small"
      Appearance="secondary-variant"
      onClick={() => router.push("/games/predictions/histories")}
    >
      <Icon name="history" />
    </Button>
  );
}
