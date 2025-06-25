"use client";

import AccordionItem from "@/components/accordion/AccordionItem";
import AccordionTrigger from "@/components/accordion/AccordionTrigger";
import AccordionContent from "@/components/accordion/AccordionContent";
import cn from "@/lib/helpers/cn";
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
      className={cn("relative w-full overflow-hidden bg-white", classname)}
    >
      <div className="relative z-10 bg-white">
        <AccordionTrigger
          className="type-title-medium data-[state=open]:bg-yellow/20 px-4 py-3 font-bold data-[state=closed]:bg-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="h-full w-full">{question}</p>
        </AccordionTrigger>
      </div>
      <AccordionContent
        className="type-body-medium z-10 px-4 pt-3 text-left text-black transition duration-300"
        isOpen={isOpen}
      >
        <p>{answer}</p>
      </AccordionContent>
    </AccordionItem>
  );
}
