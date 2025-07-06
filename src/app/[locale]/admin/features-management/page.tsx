import ListItem from "@/app/[locale]/admin/features-management/components/ListItem";
import Switch from "@/app/[locale]/admin/features-management/components/Switch";
import {
  getAllFeatureFlags,
  toggleFeatureFlag,
} from "@/app/api/v1/feature-flags/services";
import BackButton from "@/components/BackButton";
import SubPageHeader from "@/components/SubPageHeader";
import { revalidatePath } from "next/cache";

export default async function FeatureManagementPage() {
  const flags = await getAllFeatureFlags();

  async function toggleFlag(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await toggleFeatureFlag(id);
    revalidatePath("/admin/features-management");
  }

  return (
    <>
      <div className="absolute top-0 z-10 flex w-full items-center justify-between p-4">
        <BackButton variants="Tertiary" />
        <div></div>
      </div>
      <SubPageHeader title="Features" curvedText="Manage" />
      <div className="relative z-10 mx-auto -mt-16 h-full px-4">
        <div className="type-body-large text-left">
          <ListItem className="type-title-medium bg-yellow relative border-black">
            <div className="absolute inset-0 bg-[url('/decorating/texture/fabric.png')] opacity-50 mix-blend-soft-light" />
            ชื่อฟีเจอร์
          </ListItem>
          {flags.map((flag) => (
            <ListItem key={flag.id} className="grid-cols-2">
              <div>{flag.featureName}</div>
              <form action={toggleFlag} className="flex justify-end">
                <input type="hidden" name="id" value={flag.id} />
                <Switch checked={flag.enabled} />
              </form>
            </ListItem>
          ))}
        </div>
      </div>
    </>
  );
}
