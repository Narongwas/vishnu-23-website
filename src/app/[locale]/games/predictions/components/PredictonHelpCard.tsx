"use client";

import Modal from "@/app/[locale]/games/predictions/components/Modal";
import Icon from "@/components/Icon";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { useTranslations } from "next-intl";

const PredictionHelpCard: StyleableFC<{
  onClose: () => void;
}> = ({ onClose, className, style }) => {
  const t = useTranslations("Predictions.HelpDialog");
  return (
    <Modal onClose={onClose} className={cn("z-10", className)} style={style}>
      <Icon name="temple_buddhist" className="text-red" />
      <p className="type-headline-small">{t("title")}</p>

      <div className="type-body-medium flex flex-col gap-2">
        <p className="type-title-medium">{t("playing.title")}</p>
        <p className="text-balance">{t("playing.body.0")}</p>
        <div className="flex items-center">
          <Icon name="check" className="text-red" />
          <p>{t("playing.body.1.0.answer")}</p>
        </div>
        <div className="flex items-center">
          <Icon name="close" className="text-red" />
          <p>{t("playing.body.1.1.answer")}</p>
        </div>
        <p className="text-balance">{t("playing.body.2")}</p>
      </div>

      <div className="type-body-medium flex flex-col gap-2">
        <p className="type-title-medium">{t("scoring.title")}</p>
        <p>{t("scoring.body.0")}</p>
        <p>{t("scoring.body.1")}</p>
      </div>
    </Modal>
  );
};

export default PredictionHelpCard;
