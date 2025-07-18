import { db, firebaseAdmin } from "@/lib/services/firebase.admin";
import { NextRequest, NextResponse } from "next/server";

// GET : "api/v1/bingo/scores" protected
// get all groups' bingoScore and sort them in descending order
export async function GET(request: NextRequest) {
  const token =
    request.headers.get("Authorization")?.split(" ")[1] ||
    request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
  const role = decodedToken.role;

  if (role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const groupsSnapshot = await db
    .collection("groups")
    .orderBy("bingoScore", "desc")
    .get();

  const groupData = groupsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return NextResponse.json(groupData, { status: 200 });
}
