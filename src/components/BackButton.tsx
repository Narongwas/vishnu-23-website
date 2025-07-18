"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { StyleableFC } from "@/lib/types/misc";
import { useRouter } from "next/navigation";

const BackButton: StyleableFC<{
  variants: "Primary" | "Secondary" | "Tertiary" | "Games";
}> = ({ variants }) => {
  const router = useRouter();
  return (
    <Button Size="Small" Appearance={variants} onClick={() => router.back()}>
      <Icon name="arrow_back" />
    </Button>
  );
};

export default BackButton;
