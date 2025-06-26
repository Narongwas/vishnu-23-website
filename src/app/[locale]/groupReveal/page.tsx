import { redirect } from "next/navigation";
import { checkFeatureFlagByName } from "../api/v1/feature-flags/services";

export default async function Page() {
  const groupRevealFlag = await checkFeatureFlagByName("groupReveal");
  if (!groupRevealFlag) {
    redirect("/");
  }
  return <>Page Content</>;
}
