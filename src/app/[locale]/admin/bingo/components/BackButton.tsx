"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      icon="arrow_back"
      Size="Small"
      Appearance="Tertiary"
      className="relative z-10"
      onClick={() => router.back()}
    />
  );
};

export default BackButton;
