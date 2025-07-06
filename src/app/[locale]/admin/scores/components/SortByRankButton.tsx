"use client";

import Button from "@/components/Button";

export default function SortByAlphaButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <Button
      icon="format_list_numbered"
      label="เรียง"
      Size="Small"
      Appearance="Tertiary"
      onClick={onClick}
    />
  );
}
