import { redirect } from "next/navigation";
import { checkFeatureFlagByName } from "@/lib/services/featureFlags.service";
import GroupReveal from "@/components/GroupRevealContent";

export default async function Page() {
  const groupRevealFlag = await checkFeatureFlagByName("groupReveal");
  if (!groupRevealFlag) {
    redirect("/");
  }
  return <GroupReveal />;
}
