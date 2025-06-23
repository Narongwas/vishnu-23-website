"use client";

import AccordionItem from "@/components/ui/accordion/AccordionItem";
import AccordionTrigger from "@/components/ui/accordion/AccordionTrigger";
import AccordionContent from "@/components/ui/accordion/AccordionContent";
import cn from "@/lib/utils";
import { useState } from "react";

interface FaqCardProps {
  question: string;
  answer: string;
  value: string;
  classname?: string;
}

export default function FaqCard({
  question,
  answer,
  value,
  classname,
}: FaqCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionItem
      value={value} //It's a require attribute for track what item is open or close
      className={cn("relative overflow-hidden bg-white w-full ", classname)}
    >
      <div className="relative z-10 bg-white">
        <AccordionTrigger
          className="font-bold px-4 py-3 type-title-medium data-[state=open]:bg-yellow/20 data-[state=closed]:bg-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="w-full h-full">{question}</p>
        </AccordionTrigger>
      </div>
      <AccordionContent
        className="type-body-medium z-10 px-4 pt-3 text-black text-left transition duration-300"
        isOpen={isOpen}
      >
        <p>{answer}</p>
      </AccordionContent>
    </AccordionItem>
  );
}
