"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { StyleableFC } from "@/lib/types/misc";
import Icon from "@/components/Icon";
import { FaqQuestion } from "@/lib/types/faq";
import cn from "@/lib/helpers/cn";

const FaqCard: StyleableFC<FaqQuestion> = ({
  answer,
  question,
  style,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <motion.div
      layout
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("z-10 overflow-hidden bg-white text-left", className)}
      style={style}
    >
      <motion.div
        layout="position"
        className={cn(
          "type-title-medium flex w-full cursor-pointer items-center px-4 py-3 transition-all duration-200",
          isOpen ? "bg-yellow/20" : "bg-white"
        )}
        onClick={toggleOpen}
      >
        <p className="type-title-medium w-full">{question}</p>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Icon
            name="keyboard_arrow_down"
            className="text-muted-foreground text-red size-4"
          />
        </motion.div>
      </motion.div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="bg-white p-4">
              <p className="type-body-medium">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FaqCard;
