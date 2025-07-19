import { getServerAuth } from "@/lib/firebase/getServerAuth";
import { db, firebaseAdmin } from "@/lib/services/firebase.admin";

export async function getUserRole() {
  const { token } = await getServerAuth();
  if (!token) return null;
  try {
    const session = await firebaseAdmin.auth().verifyIdToken(token);
    const studentId = session.email?.split("@")[0] || "";
    const userDoc = await db.collection("users").doc(studentId).get();
    if (!userDoc.exists) return null;

    const userData = userDoc.data();
    const userRole = userData?.role;
    return userRole;
  } catch {
    return null;
  }
}
export async function checkUserAccess(allowedRoles: string[]) {
  const role = await getUserRole();
  if (role == null) {
    return false;
  }
  return allowedRoles.includes(role);
}
