"use client";

import Button from "@/components/Button";
import { StyleableFC } from "@/lib/types/misc";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";

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
