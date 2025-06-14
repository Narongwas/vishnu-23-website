import { db } from "@/utils/firebase.admin";

interface User {
  name: string;
  email: string;
  password: string;
}
export async function addUserAdmin(userData: User) {
  const docRef = await db.collection("users").add(userData);
  return docRef.id;
}
