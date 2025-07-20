"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { useRouter } from "@/i18n/navigation";
import { StyleableFC } from "@/lib/types/misc";

type BackButtonProps = {
  variants: "primary" | "secondary" | "tertiary" | "secondary-variant";
};

const BackButton: StyleableFC<Pick<BackButtonProps, "variants">> = ({
  variants,
}) => {
  const router = useRouter();
  return (
    <Button Appearance={variants} Size="small" onClick={() => router.back()}>
      <Icon name="arrow_back" />
    </Button>
  );
};

export default BackButton;
