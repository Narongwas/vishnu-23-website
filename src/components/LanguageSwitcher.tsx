"use client";

import Icon from "@/components/Icon";
import Button from "@/components/Button";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === "th" ? "en" : "th";

  function handleSwitch() {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/"));
  }

  return (
    <Button
      className="z-10 h-[44px] w-[78px] bg-white"
      aria-label="change language button"
      type="button"
      onClick={handleSwitch}
    >
      <div className="flex h-6 w-3 flex-col items-center justify-center py-[2px]">
        <Icon name={"language"} size={20} className={"text-red"} />
      </div>
      <span className="type-title-medium text-red">{locale.toUpperCase()}</span>
    </Button>
  );
}
