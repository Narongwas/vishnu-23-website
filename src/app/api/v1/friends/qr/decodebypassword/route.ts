import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/firebase.admin";

// This is a GET method to decode add friend code and return the user ID
// by send a code in the query string
export async function GET(request: NextRequest) {
  try {
    // Get the code from the query parameters
    const code = request.nextUrl.searchParams.get("code");

    // Check if the code is provided
    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    // Query the database to find the user with the provided addFriendCode
    const userSnapshot = await db
      .collection("users")
      .where("addFriendCode", "==", code)
      .select("name")
      .get();

    // Check if the user exists
    if (userSnapshot.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the user's name and uid
    return NextResponse.json(
      {
        name: userSnapshot.docs[0].data().nickName,
        uid: userSnapshot.docs[0].id,
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error("Error fetching friend id from code:", e);
    return NextResponse.json({ error: "Error decode " }, { status: 500 });
  }
}
