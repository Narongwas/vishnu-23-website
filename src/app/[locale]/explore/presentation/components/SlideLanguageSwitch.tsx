"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { StyleableFC } from "@/lib/types/misc";

interface Props {
  lang: "en" | "th";
  onSwitch: () => void;
}

const SlideLanguageSwitch: StyleableFC<Props> = ({
  lang,
  onSwitch,
  className,
}) => {
  const label = lang === "en" ? "EN" : "TH";
  const alt = lang === "en" ? "เปลี่ยนเป็นภาษาไทย" : "Change to English";

  return (
    <Button
      Size="small"
      Appearance="tertiary"
      aria-label={alt}
      title={alt}
      onClick={onSwitch}
      className={className}
    >
      <Icon name="language" />
      <span className="type-title-medium">{label}</span>
    </Button>
  );
};

export default SlideLanguageSwitch;
