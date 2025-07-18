"use client";

import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { motion } from "motion/react";

type SwitchProps = {
  checked: boolean;
  onChange?: (value: boolean) => void;
};

const Switch: StyleableFC<SwitchProps> = ({
  checked,
  onChange,
  className,
  style,
}) => {
  const toggle = () => {
    onChange?.(!checked);
  };

  return (
    <div className={cn("flex items-center gap-3", className)} style={style}>
      <motion.button
        aria-checked={checked}
        role="switch"
        whileTap="pressed"
        onClick={toggle}
        className={cn(
          "relative flex h-8 w-14 cursor-pointer rounded-full",
          checked
            ? "bg-red active:*:bg-yellow p-1"
            : "bg-yellow-white border-orange active:*:bg-red border-2 p-1.5",
          checked ? "justify-end" : "justify-start"
        )}
      >
        <motion.span
          layout
          variants={{
            initial: { scale: 1 },
            pressed: { scale: 28 / (checked ? 24 : 16) },
          }}
          transition={{ duration: 0.15 }}
          className={cn(
            "aspect-square rounded-full transition-colors",
            checked ? "bg-white" : "bg-orange"
          )}
        />
      </motion.button>
    </div>
  );
};

export default Switch;
