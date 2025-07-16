import PageHeader from "@/app/[locale]/admin/bingo/scanner/components/PageHeader";
import ScannerSection from "@/app/[locale]/admin/bingo/scanner/components/ScannerSection";
import SelectDropDown from "@/app/[locale]/admin/bingo/scanner/components/SelectDropDown";
export default function BingoScannerPage() {
  return (
    <div>
      <PageHeader />
      <ScannerSection />
      <div className="mt-8">
        <SelectDropDown />
      </div>
    </div>
  );
}
