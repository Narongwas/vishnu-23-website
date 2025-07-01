"use client";

import Icon from "@/components/Icon";
import cn from "@/lib/helpers/cn";
import type { FaqQuestion } from "@/lib/types/faq";
import { StyleableFC } from "@/lib/types/misc";
import { motion } from "motion/react";
import { useState } from "react";

const FaqCard: StyleableFC<{ questions: FaqQuestion }> = ({
  questions,
  style,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      className={cn("overflow-hidden bg-white text-left", className)}
      style={style}
    >
      <motion.div
        layout="position"
        className={cn(
          "flex w-full cursor-pointer items-center px-4 py-3 transition-colors duration-200",
          isOpen && "bg-yellow/20"
        )}
      >
        <p className="type-title-medium w-full">{questions.question}</p>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          <Icon name="expand_more" className="text-red" />
        </motion.div>
      </motion.div>

      <motion.div
        layout="position"
        className="overflow-hidden"
        style={{ height: isOpen ? "auto" : 0 }}
      >
        <motion.div
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="type-body-medium p-4"
        >
          <p>{questions.answer}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FaqCard;
