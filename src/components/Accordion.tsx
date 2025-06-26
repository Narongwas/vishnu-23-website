"use client";

import { StyleableFC } from "@/lib/types/misc";
import FaqCard from "./FaqCard";
import { FaqSection } from "@/lib/types/faq";
import SectionHeader from "@/components/SectionHeader";
import cn from "@/lib/helpers/cn";

const Accordion: StyleableFC<FaqSection> = ({
  title,
  questions,
  className,
}) => {
  return (
    <div className={cn("w-full", className)}>
      {title.length > 0 && <SectionHeader title={title} className="mb-4" />}
      <div className="flex flex-col gap-3 px-4">
        {questions.map((q, qIndex) => (
          <FaqCard key={qIndex} question={q.question} answer={q.answer} />
        ))}
      </div>
    </div>
  );
};

export default Accordion;
