"use client";

import Dialog from "@/components/Dialog";
import Icon from "@/components/Icon";
import { StyleableFC } from "@/lib/types/misc";
import { useState } from "react";

const DecreaseScoreDialog: StyleableFC<{
  onClose: () => void;
  onDecrease: (value: number) => void;
  currentScore?: number;
}> = ({ onClose, onDecrease, currentScore = 0 }) => {
  const [value, setValue] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Dialog
        onClose={onClose}
        onConfirm={() => {
          const decresed = Number(value || 0);
          onDecrease(decresed);
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <Icon name="remove" size={24} className="text-red" />
          <p className="type-headline-small">ลดคะแนน</p>
          <div className="type-title-medium flex items-center gap-2.5">
            <p>{currentScore} - </p>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="type-body-large h-11 w-24 bg-white px-5 py-4 text-black placeholder-black/40 outline-none"
            />
            <p>
              ={" "}
              {currentScore - Number(value) >= 0
                ? currentScore - Number(value)
                : 0}
            </p>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DecreaseScoreDialog;
