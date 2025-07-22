export interface User {
  id: string;
  firstName: string;
  lastName: string;
  nickName: string;
  email: string; // unique
  department: string;
  group: string;
  fullRole: string;
  role: string;
  tier: string | null; // null for campers
  contact: string[];
  sensitiveInfo?: Record<string, string>; // only for camper
  friends?: string[]; // list of Firestore document IDs
  predictions?: string[];
}
