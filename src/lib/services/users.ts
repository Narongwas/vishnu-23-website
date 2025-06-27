import { db } from "@/lib/services/firebase.admin";

/*
Service layer will handle business logic and interact with database directly
(Because imo client shouldn't interact with db directly, despite firebase allowing that)
(But its always up to u guys we can change it later)
-- Jean ---
*/

// this interface created just for testing purpose
interface User {
  name: string;
  email: string;
  password: string;
}
export async function addUserAdmin(userData: User) {
  const docRef = await db.collection("users").add(userData);
  return docRef.id;
}
