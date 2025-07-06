"use client";

import Button from "@/components/Button";

export default function SortByRankButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      icon="sort_by_alpha"
      label="เรียง"
      Size="Small"
      Appearance="Tertiary"
      onClick={onClick}
    />
  );
}
