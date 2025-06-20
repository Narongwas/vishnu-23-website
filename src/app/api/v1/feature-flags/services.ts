import { FeatureFlag } from "@/app/interfaces";
import { db } from "@/utils/firebase.admin";

export async function getAllFeatureFlags(): Promise<FeatureFlag[]> {
  const featureFlagCollection = await db.collection("featureFlags").get();
  const featureFlags = featureFlagCollection.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      featureName: data.featureName,
      enabled: data.enabled,
    } as FeatureFlag;
  });
  return featureFlags;
}
export async function addNewFeatureFlag(featureName: string, enabled: boolean) {
  const newFeature = { featureName, enabled };
  await db.collection("featureFlags").add(newFeature);
}
export async function toggleFeatureFlag(id: string): Promise<boolean> {
  const flagDoc = await db.collection("featureFlags").doc(id).get();
  if (!flagDoc.exists) {
    throw new Error("Can't find feature flag from that ID");
  }
  const data = flagDoc.data();
  if (!data) {
    throw new Error("Feature flag data is missing");
  }
  const currentStatus = data.enabled;
  await db
    .collection("featureFlags")
    .doc(id)
    .update({ enabled: !currentStatus });
  return !currentStatus;
}
export async function deleteFeatureFlag(id: string) {
  await db.collection("featureFlags").doc(id).delete();
}
export async function checkFeatureFlagByName(
  featureName: string
): Promise<boolean> {
  const featureFlagCollection = await db
    .collection("featureFlags")
    .where("featureName", "==", featureName)
    .get();
  if (featureFlagCollection.empty) {
    return false;
  }
  const doc = featureFlagCollection.docs[0];
  return doc.data().enabled;
}
