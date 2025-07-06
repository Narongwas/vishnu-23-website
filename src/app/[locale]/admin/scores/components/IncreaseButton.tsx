"use client";

import Button from "@/components/Button";
import { StyleableFC } from "@/lib/types/misc";

const IncreaseButton: StyleableFC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <Button icon="add" Size="XSmall" Appearance="Secondary" onClick={onClick} />
  );
};

export default IncreaseButton;
