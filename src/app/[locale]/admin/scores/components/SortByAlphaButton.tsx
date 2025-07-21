"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";

export default function SortByRankButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      Size="small"
      Appearance="tertiary"
      onClick={onClick}
      className="flex items-center"
    >
      <Icon name="sort_by_alpha" />
      <p className="type-title-medium">เรียง</p>
    </Button>
  );
}
