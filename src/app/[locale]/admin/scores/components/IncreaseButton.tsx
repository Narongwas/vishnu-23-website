"use client";

import IncreaseScoreDialog from "@/app/[locale]/admin/scores/components/IncreaseScoreDialog";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { StyleableFC } from "@/lib/types/misc";
import { useState } from "react";

const IncreaseButton: StyleableFC<{
  onIncrease?: (value: number) => void;
  currentScore?: number;
}> = ({ onIncrease, currentScore }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <Button
        Size="small"
        Appearance="secondary"
        onClick={() => setIsDialogOpen(!isDialogOpen)}
      >
        <Icon name="add" />
      </Button>
      {isDialogOpen && (
        <IncreaseScoreDialog
          onClose={() => setIsDialogOpen(false)}
          onIncrease={(value) => {
            onIncrease?.(value);
            setIsDialogOpen(false);
          }}
          currentScore={currentScore}
        />
      )}
    </>
  );
};

export default IncreaseButton;
