"use client";

import { useRef, useState, useEffect } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import cn from "@/lib/utils";

type AccordionContentProps = React.ComponentProps<
  typeof AccordionPrimitive.Content
> & {
  isOpen?: boolean;
};

export default function AccordionContent({
  className,
  children,
  isOpen,
  ...props
}: AccordionContentProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [measuredHeight, setMeasuredHeight] = useState(0);
  useEffect(() => {
    if (innerRef.current) {
      setMeasuredHeight(innerRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      forceMount
      className="overflow-hidden"
      {...props}
    >
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? measuredHeight : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <div ref={innerRef} className={cn("pt-0 pb-4", className)}>
          {children}
        </div>
      </motion.div>
    </AccordionPrimitive.Content>
  );
}
