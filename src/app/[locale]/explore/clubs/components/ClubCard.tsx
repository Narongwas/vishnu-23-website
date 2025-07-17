"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import InstagramIcon from "@/components/socialIcon/InstagramIcon";
import cn from "@/lib/helpers/cn";
import type { ClubItem } from "@/lib/types/club";
import { StyleableFC } from "@/lib/types/misc";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ClubCard: StyleableFC<{
  club: ClubItem;
}> = ({ club, className, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const logoURL = `/clubs-logo/${club.logo}`;
  const igURL = club.ig;
  const t = useTranslations("");
  const username = new URL(club?.ig || "").pathname.split("/")[1];
  return (
    <motion.div
      layout
      className={cn("overflow-hidden bg-white text-left", className)}
      style={style}
    >
      <motion.div
        layout="position"
        className={cn(
          "type-body-medium flex w-full cursor-pointer items-center justify-between px-4 py-3 transition-colors duration-200",
          isOpen && "bg-yellow/20"
        )}
      >
        <div className="flex items-center gap-4">
          <Image src={logoURL} alt="" width={72} height={72} />
          <div className="flex w-full flex-col gap-2 overflow-hidden">
            <p className="type-title-medium">{club.name}</p>
            <p className="line-clamp-2">{club.description}</p>
          </div>
        </div>
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
          className="type-body-medium flex flex-col gap-4 p-4"
        >
          <p>{club.description}</p>
          <div
            className={cn(
              "flex justify-end",
              club.boothPosition && "justify-between"
            )}
          >
            {club.boothPosition && (
              <div className="flex gap-1">
                <Button
                  Appearance="Secondary"
                  Size="XSmall"
                  className="flex gap-2"
                >
                  <Icon name="storefront" />
                  <span className="type-title-medium">
                    {club.boothPosition?.position}
                  </span>
                </Button>
                <Button Appearance="Secondary" Size="XSmall">
                  <span className="type-title-medium">
                    {t(`Map.Faculty.building.${club.boothPosition?.building}`)}
                  </span>{" "}
                </Button>
              </div>
            )}
            {igURL && (
              <Link href={igURL}>
                <Button
                  Appearance="Secondary"
                  Size="Small"
                  title={t("Clubs.Card.action.instagram", { username })}
                >
                  <InstagramIcon />
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ClubCard;
