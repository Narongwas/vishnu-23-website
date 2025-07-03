export interface User {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  email: string; // unique
  department: string;
  group: string;
  role: string;
  tier: string;
  sensitiveInfo?: Record<string, string>; // only for camper
  friends: string[]; // list of Firestore document IDs
}
