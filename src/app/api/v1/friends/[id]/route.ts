import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/firebase.admin";

// this is a GET method to get a list of friends by id
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const user = await db.collection("users").doc(id).get();

    if (!user.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const friends = user.data()?.friends || [];

    const friendsData = await Promise.all(
      friends.map(async (friend: string) => {
        const friendData = await db.collection("users").doc(friend).get();
        return {
          id: friendData.id,
          name: friendData.data()?.name || "Unknown",
          email: friendData.data()?.email || "Unknown",
        };
      })
    );

    return NextResponse.json(
      {
        friends: friendsData,
        user: user.data(),
      },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching friends:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
