"use client";
import HelpButton from "@/app/[locale]/games/bingo/components/HelpButton";
import HelpCard from "@/app/[locale]/games/bingo/components/HelpCard";
import cn from "@/lib/helpers/cn";
import { useState } from "react";

const HelpSection = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)} className={cn("z-10", className)}>
        <HelpButton />
      </div>
      <HelpCard isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default HelpSection;
