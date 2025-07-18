"use client";

import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

const BackButton: StyleableFC = ({ className }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button
      onClick={handleBack}
      className={cn("z-10", className)}
      Size="small"
      Appearance="secondary"
    >
      <Icon name="arrow_back" />
    </Button>
  );
};

export default BackButton;
