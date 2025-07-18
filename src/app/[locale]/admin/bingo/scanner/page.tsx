import ScannerPageClient from "@/app/[locale]/admin/bingo/scanner/components/ScannerPageClient";
import { checkFeatureFlagByName } from "@/lib/services/featureFlags.service";
import { redirect } from "next/navigation";

export default async function BingoScannerPage() {
  const groupRevealFlag = await checkFeatureFlagByName("bingo-game");
  if (!groupRevealFlag) {
    redirect("/");
  }
  return <ScannerPageClient />;
}
