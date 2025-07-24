"use client";

import ScanFeed from "@/app/scan/components/ScanQR";
import { StyleableFC } from "@/lib/types/misc";

type ScannerSectionProps = {
  onCapture: (barcode: string) => void;
};

const ScannerSection: StyleableFC<ScannerSectionProps> = ({ onCapture }) => {
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center bg-black">
      <ScanFeed onCapture={onCapture} className="h-full w-full object-cover" />
    </div>
  );
};

export default ScannerSection;
