import { cookies } from "next/headers";
import { verifyIdToken } from "@/lib/services/firebase.admin";

export async function getServerAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return { user: null, token: null };

  const user = await verifyIdToken(token);
  return { user, token };
}
