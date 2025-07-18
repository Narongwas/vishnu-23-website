"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      Size="Small"
      Appearance="Tertiary"
      className="relative z-10"
      onClick={() => router.back()}
    >
      <Icon name="arrow_back" />
    </Button>
  );
};

export default BackButton;
