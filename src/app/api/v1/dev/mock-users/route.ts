// don't forget to delete this in prod

import { NextResponse } from "next/server";
import { db } from "@/lib/services/firebase.admin";

export async function GET() {
  const mockUsers = [
    {
      firstName: "Somchai",
      lastName: "Sukjai",
      nickname: "Chai",
      email: "somchai@example.com",
      department: "Computer Engineering",
      group: "A",
      role: "camper",
      tier: null,
      sensitiveInfo: { allergy: "peanut" },
      friends: [],
    },
    {
      firstName: "Pim",
      lastName: "Ploy",
      nickname: "Ploy",
      email: "pimploy@example.com",
      department: "Electrical Engineering",
      group: "B",
      role: "reg",
      tier: "group",
      friends: [],
    },
    {
      firstName: "Tarn",
      lastName: "Siri",
      nickname: "Tarn",
      email: "tarn.siri@example.com",
      department: "Civil Engineering",
      group: "A",
      role: "coop",
      tier: "core",
      friends: [],
    },
    {
      firstName: "Bank",
      lastName: "Thana",
      nickname: "Bank",
      email: "bank@example.com",
      department: "Industrial Engineering",
      group: "B",
      role: "admin",
      tier: "core",
      friends: [],
    },
    {
      firstName: "May",
      lastName: "Chan",
      nickname: "May",
      email: "maychan@example.com",
      department: "Chemical Engineering",
      group: "C",
      role: "staff",
      tier: "core",
      friends: [],
    },
    {
      firstName: "Nina",
      lastName: "Lert",
      nickname: "Nina",
      email: "nina@example.com",
      department: "Architecture",
      group: "D",
      role: "board",
      tier: "core",
      friends: [],
    },
    {
      firstName: "Gun",
      lastName: "Wit",
      nickname: "Gun",
      email: "gunwit@example.com",
      department: "Mechanical Engineering",
      group: "C",
      role: "camper",
      tier: null,
      sensitiveInfo: { medication: "ibuprofen" },
      friends: [],
    },
    {
      firstName: "View",
      lastName: "Supak",
      nickname: "View",
      email: "view@example.com",
      department: "Computer Engineering",
      group: "A",
      role: "staff",
      tier: "group",
      friends: [],
    },
    {
      firstName: "Kong",
      lastName: "Wong",
      nickname: "Kong",
      email: "kongw@example.com",
      department: "Electrical Engineering",
      group: "B",
      role: "med",
      tier: "group",
      friends: [],
    },
    {
      firstName: "Jane",
      lastName: "Chaiyo",
      nickname: "Jane",
      email: "janechaiyo@example.com",
      department: "Computer Engineering",
      group: "A",
      role: "camper",
      tier: null,
      sensitiveInfo: { guardianPhone: "0812345678" },
      friends: [],
    },
    {
      firstName: "Pete",
      lastName: "Suwan",
      nickname: "Pete",
      email: "pete@example.com",
      department: "Industrial Engineering",
      group: "C",
      role: "board",
      tier: "core",
      friends: [],
    },
    {
      firstName: "Nam",
      lastName: "Thida",
      nickname: "Nam",
      email: "namthida@example.com",
      department: "Architecture",
      group: "D",
      role: "reg",
      tier: "group",
      friends: [],
    },
  ];

  const batch = db.batch();
  const usersRef = db.collection("users");

  mockUsers.forEach((user) => {
    const docRef = usersRef.doc();
    batch.set(docRef, user);
  });

  try {
    await batch.commit();
    return NextResponse.json(
      { message: "✅ Seeded mock users." },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Error seeding users:", err);
    return NextResponse.json(
      { error: "Failed to seed users" },
      { status: 500 }
    );
  }
}
