import { db } from "@/lib/services/firebase.admin";

/*
Service layer will handle business logic and interact with database directly
(Because imo client shouldn't interact with db directly, despite firebase allowing that)
(But its always up to u guys we can change it later)
-- Jean ---
*/

// this interface created just for testing purpose
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  photoURL?: string;
  friends: string[];
  [key: string]: unknown;
}

export interface Friend {
  firstName: string;
  lastName: string;
  email: string;
  profileUrl?: string;
  [key: string]: unknown;
  nickName?: string;
}
export async function addUserAdmin(userData: User) {
  const docRef = await db.collection("users").add(userData);
  return docRef.id;
}
