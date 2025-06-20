export async function fetchFeatureFlags() {
  try {
    const res = await fetch("/api/v1/feature-flags", { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch feature flags");
    }
    const flagsArray = await res.json();
    const featureFlags: Record<string, boolean> = {};
    for (const flag of flagsArray) {
      if (flag.featureName && typeof flag.enabled === "boolean") {
        featureFlags[flag.featureName] = flag.enabled;
      }
    }
    return featureFlags;
  } catch (error) {
    console.error("Error fetching feature flags:", error);
    return {};
  }
}
