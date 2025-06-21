import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import cn from "@/lib/utils";
import Icon from "@/components/Icon";

export default function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>i]:rotate-180 ",
          className
        )}
        {...props}
      >
        {children}

        <Icon
          name="keyboard_arrow_down"
          className="text-muted-foreground pointer-events-none text-red size-4 shrink-0 translate-y-0.5 transition-all duration-200"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}
