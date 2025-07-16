import { db } from "@/lib/services/firebase.admin";
import { NextResponse } from "next/server";

interface GroupData {
  id: string;
  name: string;
  bingoScore: number;
  // Add other specific fields you want here
}

// List of columns to include in CSV (in desired order)
const CSV_COLUMNS: (keyof GroupData)[] = ["id", "name", "bingoScore"]; // Customize this order

function convertToCSV(data: GroupData[]): string {
  if (data.length === 0) return "";

  // Use our predefined columns instead of all object keys
  const headers = CSV_COLUMNS;
  const rows = data.map((row) =>
    headers
      .map((field) => {
        let value = row[field];

        // Handle Firestore Timestamps (if you have any in your selected columns)
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
