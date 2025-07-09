"use client";

import Button from "@/components/Button";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { useRouter } from "next/navigation";

const BackButton: StyleableFC<{
  className?: string;
}> = ({ className }) => {
  const router = useRouter();
  return (
    <Button
      Size="Small"
      Appearance="Secondary"
      icon="arrow_back"
      className={cn("z-10 text-black", className)}
      onClick={() => router.back()}
    />
  );
};

export default BackButton;
