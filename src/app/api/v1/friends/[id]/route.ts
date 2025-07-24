import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/firebase.admin";

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

// this is a GET method to get a list of friends by id
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const user = await db.collection("users").doc(id).get();

    // Check if the user exists
    if (!user.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const friends = user.data()?.friends || [];

    const friendChunks = chunkArray(friends, 10);

    // get the friends' data from their ids
    const friendsData = (
      await Promise.all(
        friendChunks.map(async (chunk) => {
          if (chunk.length === 0) return [];
          const friendDocs = await db
            .collection("users")
            .where("__name__", "in", chunk)
            .get();
          return friendDocs.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().nickName || "",
            email: doc.data().email || "Unknown",
            profile: doc.data().profileUrl,
          }));
        })
      )
    ).flat();

    return NextResponse.json(
      {
        friends: friendsData,
        user: user.data(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching friends:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
