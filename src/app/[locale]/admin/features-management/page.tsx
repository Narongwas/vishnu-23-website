import FeatureControl from "@/app/[locale]/admin/features-management/components/FeatureControl";
import BackButton from "@/components/BackButton";
import SubPageHeader from "@/components/SubPageHeader";
import { checkUserAccess } from "@/lib/middleware/checkUserAccess";
import { redirect } from "next/navigation";

export default async function FeatureManagementPage() {
  if (!(await checkUserAccess(["admin"]))) {
    redirect("/");
  }
  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute top-0 z-10 flex w-full items-center justify-between py-4">
        <BackButton variant="tertiary" href="/admin" />
      </div>
      <SubPageHeader title="Features" curvedText="Manage" />
      <FeatureControl />
    </div>
  );
}
