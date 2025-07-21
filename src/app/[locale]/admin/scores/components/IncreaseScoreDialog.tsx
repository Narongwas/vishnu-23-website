"use client";

import Dialog from "@/components/Dialog";
import Icon from "@/components/Icon";
import { StyleableFC } from "@/lib/types/misc";
import { useState } from "react";

const IncreaseScoreDialog: StyleableFC<{
  onClose: () => void;
  onIncrease: (value: number) => void;
  currentScore?: number;
}> = ({ onClose, onIncrease, currentScore = 0 }) => {
  const [value, setValue] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Dialog
        onClose={onClose}
        onConfirm={() => {
          const added = Number(value || 0);
          onIncrease(added);
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <Icon name="add" size={24} className="text-red" />
          <p className="type-headline-small">เพิ่มคะแนน</p>
          <div className="type-title-medium flex items-center gap-2.5">
            <p>{currentScore} + </p>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="type-body-large h-11 w-24 bg-white px-5 py-4 text-black placeholder-black/40 outline-none"
            />
            <p>= {currentScore + Number(value)}</p>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default IncreaseScoreDialog;
