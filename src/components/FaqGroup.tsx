"use client";

import FaqCard from "@/components/FaqCard";
import SectionHeader from "@/components/SectionHeader";
import cn from "@/lib/helpers/cn";
import type { FaqSection } from "@/lib/types/faq";
import { StyleableFC } from "@/lib/types/misc";
import { motion } from "motion/react";

const FaqGroup: StyleableFC<{
  section: FaqSection;
}> = ({ section, className }) => {
  return (
    <div className={cn("w-full", className)}>
      {section.title && (
        <motion.div layout>
          <SectionHeader title={section.title} className="mb-4" />
        </motion.div>
      )}
      <div className="space-y-3 px-4">
        {section.questions.map((question, index) => (
          <FaqCard key={index} questions={question} />
        ))}
      </div>
    </div>
  );
};

export default FaqGroup;
