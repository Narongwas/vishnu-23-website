import { db } from "@/lib/services/firebase.admin";
import { NextResponse } from "next/server";

interface GroupData {
  id: string;
  bingoScore: number;
  [key: string]: unknown; // For other dynamic properties
}

function convertToCSV(data: GroupData[]): string {
  if (data.length === 0) return "";

  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers
      .map((field) => {
        let value = row[field];

        // Handle Firestore Timestamps
        if (value && typeof value === "object" && "toDate" in value) {
          value = (value as { toDate: () => Date }).toDate().toISOString();
        }

        // Stringify objects/arrays
        if (typeof value === "object" && value !== null) {
          value = JSON.stringify(value);
        }

        return `"${String(value ?? "").replace(/"/g, '""')}"`;
      })
      .join(",")
  );

  // Add UTF-8 BOM for Excel compatibility
  return "\uFEFF" + [headers.join(","), ...rows].join("\n");
}

export async function GET() {
  try {
    const groupsSnapshot = await db
      .collection("groups")
      .orderBy("bingoScore", "desc")
      .get();
    const groupData = groupsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as GroupData[];

    const csv = convertToCSV(groupData);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="bingo-scores.csv"',
      },
    });
  } catch (error) {
    console.error("Error generating CSV:", error);
    return new NextResponse("Error generating CSV", { status: 500 });
  }
}
