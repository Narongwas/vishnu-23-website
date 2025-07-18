"use client";

import ScanFeed from "@/app/scan/components/ScanQR";
import { StyleableFC } from "@/lib/types/misc";

type ScannerSectionProps = {
  onCapture: (barcode: string) => void;
};

const ScannerSection: StyleableFC<ScannerSectionProps> = ({ onCapture }) => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <div className="max-h-sm w-full max-w-md rounded-xl bg-white/80 p-4 shadow-lg">
        <ScanFeed
          onCapture={(barcode) => onCapture(barcode)}
          className="!h-96 !w-full overflow-hidden rounded-lg bg-black"
        />
      </div>
      {/* The result is now displayed in the confirmation modal, so this can be removed. */}
    </div>
  );
};

export default ScannerSection;
