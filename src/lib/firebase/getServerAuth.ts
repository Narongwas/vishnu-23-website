import { cookies } from "next/headers";
import { verifyIdToken } from "@/lib/services/firebase.admin";

export async function getServerAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) return { user: null, token: null };

    const user = await verifyIdToken(token);
    return { user, token };
  } catch (error) {
    console.error("Error in getServerAuth:", error);
    return { user: null, token: null };
  }
}
