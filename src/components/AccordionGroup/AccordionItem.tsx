import * as AccordionPrimitive from "@radix-ui/react-accordion";
import cn from "@/lib/helpers/cn";

export default function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-none", className)}
      {...props}
    />
  );
}
