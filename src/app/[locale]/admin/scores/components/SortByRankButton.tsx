"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";

export default function SortByAlphaButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <Button
      Size="small"
      Appearance="tertiary"
      onClick={onClick}
      className="flex items-center"
    >
      <Icon name="format_list_numbered" />
      <p className="type-title-medium">เรียง</p>
    </Button>
  );
}
