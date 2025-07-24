"use client";

import SlideLanguageSwitch from "@/app/[locale]/explore/presentation/components/SlideLanguageSwitch";
import VerticalImageSlides from "@/app/[locale]/explore/presentation/components/VerticalImageSlide";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

const slideURLs = {
  en: {
    url: "/slides/Firstdate_English.pdf",
    filename: "Firstdate_English.pdf",
  },
  th: {
    url: "/slides/Firstdate_Thai.pdf",
    filename: "Firstdate_Thai.pdf",
  },
};

const SlideControl: StyleableFC = ({ className, style }) => {
  const lang = useLocale();
  const t = useTranslations("Presentation");
  const [language, setLanguage] = useState<"en" | "th">(
    lang === "th" ? "th" : "en"
  );

  const slideCount = 17;

  const slidesEN = Array.from(
    { length: slideCount },
    (_, i) => `/slides/firstdate-en/${i + 1}.jpg`
  );
  const slidesTH = Array.from(
    { length: slideCount },
    (_, i) => `/slides/firstdate-th/${i + 1}.jpg`
  );

  const currentSlides = language === "en" ? slidesEN : slidesTH;

  const downloadSlide = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    const { url, filename } = slideURLs[language];
    downloadSlide(url, filename);
  };

  return (
    <div className={cn(className)} style={style}>
      <div className="absolute top-0 z-10 flex w-full items-center justify-between py-4">
        <BackButton variant="tertiary" href="/explore/presentation" />
        <SlideLanguageSwitch
          lang={language}
          onSwitch={() => setLanguage(language === "en" ? "th" : "en")}
          className="right-8"
        />
      </div>

      <VerticalImageSlides
        imagePaths={currentSlides}
        className="relative z-10 -mt-15 mb-10"
      />
      <Button
        Size="small"
        Appearance="secondary"
        className="text-red fixed bottom-7 left-1/2 z-10 -translate-x-1/2"
        onClick={handleDownload}
      >
        <Icon name="download" size={24} />
        <span className="type-title-medium">{t("action.download")}</span>
      </Button>
    </div>
  );
};

export default SlideControl;
