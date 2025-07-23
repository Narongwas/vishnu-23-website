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
  contact: UserContact;
  sensitiveInfo?: Record<string, string>; // only for camper
  friends?: string[]; // list of Firestore document IDs
  predictions?: string[];
  profileUrl: string; // URL to the user's profile picture
}

export interface UserContact {
  instagram: string;
  facebook: string;
  twitter: string;
  discord: string;
  youtube: string;
  tiktok: string;
  twitch: string;
  github: string;
  steam: string;
  riot: string;
  epic: string;
  roblox: string;
  playstation: string;
  line: string;
}
