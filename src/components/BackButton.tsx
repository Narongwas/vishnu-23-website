"use client";

import Button from "@/components/Button";
import { StyleableFC } from "@/lib/types/misc";
import { useRouter } from "next/navigation";

const BackButton: StyleableFC<{
  variants: "Primary" | "Secondary" | "Tertiary" | "Games";
}> = ({ variants }) => {
  const router = useRouter();
  return (
    <Button
      icon="arrow_back"
      Size="Small"
      Appearance={variants}
      onClick={() => router.back()}
    />
  );
};

export default BackButton;
