"use client";

import Ball from "@/app/[locale]/games/predictions/components/Ball";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import { StyleableFC } from "@/lib/types/misc";
import { motion } from "framer-motion";
import type { PredictionHistoryItem } from "@/lib/types/prediction";
import { useLocale, useTranslations } from "next-intl";
import cn from "@/lib/helpers/cn";

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
  answer?: PredictionHistoryItem;
};

const AnswerCard: StyleableFC<HelperCardProps> = ({
  onClose,
  answer,
  className,
  style,
}) => {
  const locale = useLocale() as "th" | "en";
  const t = useTranslations("Predictions");
  return (
    <Modal onClose={onClose} className={className} style={style}>
      {/* 1. Icon */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeIn}
      >
        <Icon name="history_edu" className="text-red" size={24} />
      </motion.div>

      {/* 2. Header */}
      <motion.p
        className="type-headline-small"
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeIn}
      >
        {t("AnswerDialog.title")}
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
          <p className="type-title-small text-red">ช่วง{answer?.time}</p>
          <p className="type-title-medium text-center text-balance">
            {answer?.question[locale]}
          </p>
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
        {answer?.answer}
      </motion.p>

      {/* 5. Answer Description */}
      <motion.p
        className="type-title-medium text-center"
        initial="hidden"
        animate="visible"
        custom={3}
        variants={fadeIn}
      >
        {t("AnswerDialog.isCorrect")}
      </motion.p>

      {/* 6. Answer Ball */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={4}
        variants={fadeIn}
      >
        <Ball type={answer?.isCorrect ? "correct" : "wrong"}>
          <div
            className={cn(
              "type-headline-large relative opacity-60",
              !answer?.isCorrect && "text-white"
            )}
          >
            {t("AnswerBall.large", {
              correct: answer?.isCorrect ? "true" : "false",
            })}
          </div>
        </Ball>
      </motion.div>

      {/* 7. Actual Answer (only if wrong) */}
      {!answer?.isCorrect && (
        <motion.p
          className="type-body-medium"
          initial="hidden"
          animate="visible"
          custom={5}
          variants={fadeIn}
        >
          {t("AnswerBall.solution", {
            solution: answer?.solution[locale] || "",
          })}
        </motion.p>
      )}
    </Modal>
  );
};

export default AnswerCard;
