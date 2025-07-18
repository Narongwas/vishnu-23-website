import FeatureControl from "@/app/[locale]/admin/features-management/components/FeatureControl";
import BackButton from "@/components/BackButton";
import SubPageHeader from "@/components/SubPageHeader";

export default async function FeatureManagementPage() {
  return (
    <>
      <div className="absolute top-0 z-10 flex w-full items-center justify-between py-4">
        <BackButton variants="tertiary" />
      </div>
      <SubPageHeader title="Features" curvedText="Manage" />
      <FeatureControl />
    </>
  );
}
