import { flagCheck } from "@/helpers/featureFlags";
import { redirect } from "next/navigation";

export default async function Page() {
  const groupRevealFlag = await flagCheck("groupReveal");
  if (!groupRevealFlag) {
    redirect("/");
  }
  return <>Page Content</>;
}
