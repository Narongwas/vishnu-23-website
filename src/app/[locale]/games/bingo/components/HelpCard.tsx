"use client";

import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import { StyleableFC } from "@/lib/types/misc";
import bingoFivePoint from "@/public/decorating/bingo/bingoFivePoint.svg";
import bingoOnePoint from "@/public/decorating/bingo/bingoOnePoint.svg";
import bingoSpecial from "@/public/decorating/bingo/bingoSpecial.svg";
import { useTranslations } from "next-intl";
import Image from "next/image";

const HelpCard: StyleableFC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose, className }) => {
  const t = useTranslations("Bingo.HelpDialog");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Modal onClose={onClose} className={className}>
        <div className="flex flex-col items-center justify-center gap-4">
          <Icon name="dataset" size={24} className="text-red" />
          <div className="type-headline-small">{t("title")}</div>
          <div className="flex flex-col items-start gap-2">
            <div className="type-title-medium">{t("playing.title")}</div>
            <div className="type-body-medium">{t("playing.body")}</div>
          </div>
          <div className="align-center flex flex-col items-start justify-center gap-2">
            <div className="type-title-medium">{t("scoring.title")}</div>
            <div className="flex items-center justify-center gap-2">
              <Image
                src={bingoOnePoint}
                alt="bingoOnePoint"
                width={24}
                height={24}
                className="relative z-10 opacity-100"
              />
              <p className="type-body-medium">{t("scoring.body.0")}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Image
                src={bingoFivePoint}
                alt="bingoFivePoint"
                width={24}
                height={24}
                className="relative z-10 opacity-100"
              />
              <p className="type-body-medium">{t("scoring.body.1")}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Icon name="dataset" size={24} className="text-red" />
              <p className="type-body-medium">{t("scoring.body.2")}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Image
                src={bingoSpecial}
                alt="bingoSpecial"
                width={24}
                height={24}
                className="relative z-10 opacity-100"
              />
              <p className="type-body-medium">{t("scoring.body.3")}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HelpCard;
