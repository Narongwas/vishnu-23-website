"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

type DialogAction = "close" | "cancel" | "confirm";

const Dialog: StyleableFC<{
  icon: string;
  title: string;
  variant: "close" | "cancelOkay";
  children: React.ReactNode;
  onAction: (action: DialogAction) => void;
}> = ({ icon, title, variant, className, children, onAction }) => {
  const t = useTranslations("Common.Action");

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 bg-black"
        onClick={() => onAction(variant === "close" ? "close" : "cancel")}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed inset-0 z-50 flex h-screen flex-col items-center justify-center",
          className
        )}
      >
        <motion.div className="bg-yellow-white fabric-texture flex w-[310px] flex-col items-center justify-center gap-4 p-6 pb-9">
          <Icon name={icon} size={24} className="text-red" />
          <h1 className="type-headline-small text-center text-balance text-black">
            {title}
          </h1>
          {children}
        </motion.div>
        {variant === "close" ? (
          <Button
            className="w-[310px]"
            Appearance="primary"
            Size="medium"
            onClick={() => onAction("close")}
          >
            <p className="type-title-medium">{t("close")}</p>
          </Button>
        ) : (
          <div className="grid w-[310px] grid-cols-2">
            <Button
              Appearance="secondary"
              Size="medium"
              onClick={() => onAction("cancel")}
            >
              <p className="type-title-medium">{t("cancel")}</p>
            </Button>
            <Button
              Appearance="primary"
              Size="medium"
              onClick={() => onAction("confirm")}
            >
              <p className="type-title-medium">{t("confirm")}</p>
            </Button>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Dialog;
