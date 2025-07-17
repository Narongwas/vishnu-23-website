import { redirect } from "next/navigation";
import { checkFeatureFlagByName } from "@/lib/services/featureFlags.service";
import GroupReveal from "@/app/[locale]/group-reveal/components/GroupRevealContent";

export default async function Page() {
  const groupRevealFlag = await checkFeatureFlagByName("groupReveal");
  if (!groupRevealFlag) {
    redirect("/");
  }
  return <GroupReveal />;
}
