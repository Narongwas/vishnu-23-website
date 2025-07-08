import { redirect } from "next/navigation";
import { checkFeatureFlagByName } from "@/app/api/v1/feature-flags/services";
import GroupReveal from "@/components/GroupRevealContent";

export default async function Page() {
  const groupRevealFlag = await checkFeatureFlagByName("groupReveal");
  if (!groupRevealFlag) {
    redirect("/");
  }
  return <GroupReveal />;
}
