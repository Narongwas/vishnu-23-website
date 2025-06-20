"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef, useState } from "react";
import { Fray } from "@/components/svgs/Fray";
import { ciColors } from "@/themes/colors";

interface FaqCollapseProps {
  question: string;
  answer: string;
}

export default function FaqCollapse({ question, answer }: FaqCollapseProps) {
  const [open, setOpen] = useState(false);
  const [triggerHeight, setTriggerHeight] = useState(0);

  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerHeight(triggerRef.current.offsetHeight);
    }
  }, [question]); // re-measure if question text changes

  return (
    <Accordion
      type="single"
      collapsible
      onValueChange={(val) => setOpen(val === "item-1")}
      className="w-[359px] mx-auto"
    >
      <AccordionItem value="item-1" className="relative overflow-hidden ">
        {/* Trigger background with dynamic height */}
        <div
          className="absolute top-0 left-0 w-full z-0"
          style={{ height: `${triggerHeight}px` }}
        >
          <Fray
            className="w-full h-full"
            color="#FFFFFF"
            style={{ zIndex: 0 }}
          />
          {open && (
            <Fray
              className="w-full h-full absolute top-0 left-0"
              color={ciColors.yellow}
              style={{ opacity: 0.2, zIndex: 10 }}
            />
          )}
        </div>

        {/* Trigger text layer with ref */}
        <div ref={triggerRef} className="relative z-10">
          <AccordionTrigger className="font-bold px-[15px] py-[11px] title-medium ">
            <div className="w-[285px]">{question}</div>
          </AccordionTrigger>
        </div>

        {/* Content background + foreground */}
        <AccordionContent
          className="relative z-10 px-4 pt-3 text-sm text-black"
          style={{
            marginTop: "-2px", // remove 1px rounding gap between sections
          }}
        >
          {/* Content background */}
          <div
            className="absolute left-0 w-full"
            style={{
              top: `-${triggerHeight - 1}px`, // slightly overlap into trigger
              height: `calc(100% + ${triggerHeight + 1}px)`, // ensure full coverage
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <Fray
              className="w-full h-full"
              color="#FFFFFF"
              style={{ opacity: 1 }}
            />
          </div>

          {/* Content text */}
          <div className="relative z-10 text-left body-medium">{answer}</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
