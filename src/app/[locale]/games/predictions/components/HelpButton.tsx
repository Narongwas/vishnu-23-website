"use client";

import PredictionHelpCard from "@/app/[locale]/games/predictions/components/PredictonHelpCard";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { useState } from "react";

export default function HelpButton() {
  const [showHelper, setShowHelper] = useState(false);
  return (
    <>
      <Button
        Size="small"
        Appearance="secondary-variant"
        onClick={() => setShowHelper(true)}
      >
        <Icon name="help" />
      </Button>

      {showHelper && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <PredictionHelpCard onClose={() => setShowHelper(!setShowHelper)} />
        </div>
      )}
    </>
  );
}
