import PageHeader from "@/app/[locale]/admin/bingo/scanner/components/PageHeader";
import ScannerSection from "@/app/[locale]/admin/bingo/scanner/components/ScannerSection";
import CodeStampButton from "@/app/[locale]/admin/bingo/scanner/components/CodeStampButton";
export default function BingoScannerPage() {
  return (
    <div>
      <PageHeader />
      <ScannerSection />
      <div className="mt-8 flex items-center justify-center">
        <CodeStampButton />
      </div>
    </div>
  );
}
