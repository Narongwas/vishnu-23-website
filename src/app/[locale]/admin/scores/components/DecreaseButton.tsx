"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { StyleableFC } from "@/lib/types/misc";
import { useState } from "react";
import DecreaseScoreDialog from "@/app/[locale]/admin/scores/components/DecreaseScoreDialog";

const DecreaseButton: StyleableFC<{
  onDencrease?: (value: number) => void;
  currentScore?: number;
}> = ({ onDencrease, currentScore }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <Button
        Size="small"
        Appearance="secondary"
        onClick={() => setIsDialogOpen(!isDialogOpen)}
      >
        <Icon name="remove" />
      </Button>
      {isDialogOpen && (
        <DecreaseScoreDialog
          onClose={() => setIsDialogOpen(false)}
          onDecrease={(value) => {
            onDencrease?.(value);
            setIsDialogOpen(false);
          }}
          currentScore={currentScore}
        />
      )}
    </>
  );
};

export default DecreaseButton;
