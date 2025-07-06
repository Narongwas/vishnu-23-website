"use client";

import Button from "@/components/Button";
import { StyleableFC } from "@/lib/types/misc";

const DecreaseButton: StyleableFC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <Button
      icon="remove"
      Size="XSmall"
      Appearance="Secondary"
      onClick={onClick}
    />
  );
};

export default DecreaseButton;
