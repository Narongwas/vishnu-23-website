"use client";

import { useState } from "react";
import ScanFeed from "@/app/scan/components/ScanQR";

const ScannerSection = () => {
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <div className="max-h-sm w-full max-w-md rounded-xl bg-white/80 p-4 shadow-lg">
        <ScanFeed
          onCapture={(barcode) => setResult(barcode)}
          className="!h-96 !w-full overflow-hidden rounded-lg bg-black"
        />
      </div>
      {result && (
        <div className="mt-4 text-center text-lg text-green-700">
          สแกนได้: {result}
        </div>
      )}
    </div>
  );
};

export default ScannerSection;
