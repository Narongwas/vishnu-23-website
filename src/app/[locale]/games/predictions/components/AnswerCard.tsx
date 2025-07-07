"use client";

import Ball from "@/app/[locale]/games/predictions/components/Ball";
import Modal from "@/app/[locale]/games/predictions/components/Modal";
import Icon from "@/components/Icon";
import { StyleableFC } from "@/lib/types/misc";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 1, duration: 0.5 },
  }),
};

type HelperCardProps = {
  onClose: () => void;
};

const AnswerCard: StyleableFC<HelperCardProps> = ({
  onClose,
  className,
  style,
}) => {
  return (
    <Modal onClose={onClose} className={className} style={style}>
      {/* 1. Icon */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeIn}
      >
        <Icon name="history_edu" className="text-red" />
      </motion.div>

      {/* 2. Header */}
      <motion.p
        className="type-headline-small"
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeIn}
      >
        สารจากสวรรค์…
      </motion.p>

      {/* 3. Timestamp + Question */}
      <motion.div
        className="type-body-medium flex flex-col gap-2"
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeIn}
      >
        <div className="flex flex-col items-center">
          <p className="type-title-small text-red">ช่วงเช้า</p>
          <p className="type-title-medium">ในคณะวิศวฯ มีต้นจามจุรีกี่ต้น</p>
        </div>
      </motion.div>

      {/* 4. User Answer */}
      <motion.p
        className="type-title-large text-red"
        initial="hidden"
        animate="visible"
        custom={2}
        variants={fadeIn}
      >
        20
      </motion.p>

      {/* 5. Answer Description */}
      <motion.p
        className="type-title-medium text-center"
        initial="hidden"
        animate="visible"
        custom={3}
        variants={fadeIn}
      >
        เป็นคำตอบที่…
      </motion.p>

      {/* 6. Answer Ball */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={4}
        variants={fadeIn}
      >
        <Ball type="wrong" />
      </motion.div>

      {/* 7. Actual Answer (only if wrong) */}
      <motion.p
        className="type-body-medium"
        initial="hidden"
        animate="visible"
        custom={5}
        variants={fadeIn}
      >
        เฉลย: 15
      </motion.p>
    </Modal>
  );
};

export default AnswerCard;
