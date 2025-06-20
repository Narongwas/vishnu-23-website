import { getAllFeatureFlags } from "@/app/api/v1/feature-flags/services";
import { FeatureFlag } from "@/app/interfaces";

export async function flagCheck(flagName: string): Promise<boolean> {
  // use service to interact with database directly because
  // -this func will only be use in server-side
  const flags: FeatureFlag[] = await getAllFeatureFlags();
  const flag = flags.find((f) => f.featureName === flagName);
  return !!(flag && flag.enabled);
}
