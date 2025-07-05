"use client";

import PredictionHelpCard from "@/app/[locale]/games/predictions/components/PredictonHelpCard";
import Button from "@/components/Button";
import { useState } from "react";

export default function HelpButton() {
  const [showHelper, setShowHelper] = useState(false);
  return (
    <>
      <Button
        icon="help"
        Size="Small"
        Appearance="Primary"
        className="text-blue bg-yellow"
        onClick={() => setShowHelper(true)}
      />

      {showHelper && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50">
          <PredictionHelpCard onClose={() => setShowHelper(!setShowHelper)} />
        </div>
      )}
    </>
  );
}
