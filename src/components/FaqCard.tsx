"use client";

import Accordion from "@/components/ui/accordion/Accordion";
import AccordionItem from "@/components/ui/accordion/AccordionItem";
import AccordionContent from "@/components/ui/accordion/AccordionContent";
import AccordionTrigger from "@/components/ui/accordion/AccordionTrigger";

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
      className="w-full px-4 mx-auto"
    >
      <AccordionItem
        value="item"
        className="relative overflow-hidden bg-white "
      >
        <div
          className={cn("relative z-10 ", open ? "bg-yellow/20" : "bg-white")}
        >
          <AccordionTrigger className="font-bold px-4 py-3 type-title-medium">
            <p className="w-full h-full">{question}</p>
          </AccordionTrigger>
        </div>

        <AccordionContent
          className="type-body-medium z-10 px-4 pt-3 text-black text-left"
          isOpen={open}
        >
          {/* Content text */}
          <p>{answer}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
