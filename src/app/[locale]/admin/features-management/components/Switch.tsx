"use client";

import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { motion } from "framer-motion";
import { useState } from "react";

type SwitchProps = {
  checked?: boolean;
  onChange?: (value: boolean) => void;
};

const Switch: StyleableFC<SwitchProps> = ({
  checked,
  onChange,
  className,
  style,
}) => {
  const [internalChecked, setInternalChecked] = useState(checked ?? false);
  const isControlled = typeof checked === "boolean";
  const isChecked = isControlled ? checked : internalChecked;

  const [pressed, setPressed] = useState(false);

  const toggle = () => {
    const newValue = !isChecked;
    if (!isControlled) setInternalChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={cn("flex items-center gap-3", className)} style={style}>
      <button
        type="submit"
        onClick={toggle}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        className={cn(
          "relative flex h-8 w-14 items-center rounded-full px-1",
          isChecked ? "bg-red" : "bg-yellow-white border-orange border-2",
          isChecked ? "justify-end" : "justify-start"
        )}
        role="switch"
        aria-checked={isChecked}
      >
        <motion.span
          layout
          animate={{
            width: pressed ? "1.75rem" : isChecked ? "1.5rem" : "1rem",
            height: pressed ? "1.75rem" : isChecked ? "1.5rem" : "1rem",
          }}
          transition={{ duration: 0.15 }}
          className={cn(
            "w-4 rounded-full",
            pressed
              ? isChecked
                ? "bg-yellow"
                : "bg-red"
              : isChecked
                ? "bg-white"
                : "bg-orange"
          )}
        />
      </button>
    </div>
  );
};

export default Switch;
