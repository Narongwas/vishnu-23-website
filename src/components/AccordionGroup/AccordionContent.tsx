"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import cn from "@/lib/helpers/cn";

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
  return (
    <AccordionPrimitive.Content
      data-slot="accordion"
      forceMount
      className="overflow-hidden"
      {...props}
    >
      <motion.div
        layout
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          layout: {
            duration: 0.3,
            ease: "easeOut",
          },
          opacity: { duration: 0.2 },
        }}
        className="overflow-hidden"
      >
        <motion.div layout className={cn("py-4 pt-0", className)}>
          {children}
        </motion.div>
      </motion.div>
    </AccordionPrimitive.Content>
  );
}
