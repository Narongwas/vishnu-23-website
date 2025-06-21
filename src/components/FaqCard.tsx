"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import cn from "@/lib/utils";

interface FaqCardProps {
  question: string;
  answer: string;
  classname?: string;
}

export default function FaqCard({ question, answer }: FaqCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Accordion
      type="single"
      collapsible
      onValueChange={(val) => setOpen(val === "item")}
      className={cn("w-full px-[16px] mx-auto")}
    >
      <AccordionItem
        value="item"
        className="relative overflow-hidden bg-white "
      >
        <div className={`relative z-10 ${open ? "bg-yellow/20" : "bg-white"} `}>
          <AccordionTrigger
            className={`font-bold px-4 py-3 type-title-medium `}
          >
            <p className="w-full h-full">{question}</p>
          </AccordionTrigger>
        </div>

        <AccordionContent className="type-body-medium z-10 px-4 pt-3 text-black text-left">
          {/* Content text */}
          <p>{answer}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
