import countBingoTable from "@/lib/helpers/countBingoTable";
import { db, firebaseAdmin } from "@/lib/services/firebase.admin";
import { NextRequest, NextResponse } from "next/server";

// GET : "api/v1/bingo/users" protected
// get user bingo and bingoCounter
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  const cookieToken = request.cookies.get("authToken")?.value;

  // get token from the authorization request header or cookie
  const token = authHeader?.split(" ")[1] || cookieToken;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // verify the token
  let session;
  try {
    session = await firebaseAdmin.auth().verifyIdToken(token);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid or expired token: " + error },
      { status: 401 }
    );
  }

  // get the user email from the token
  const email: string | undefined = session?.email;

  // get the user data from the database
  const users = await db.collection("users").where("email", "==", email).get();

  if (users.empty) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const user = users.docs[0].data();

  // get the group data from the database
  const groups = await db
    .collection("groups")
    .where(firebaseAdmin.firestore.FieldPath.documentId(), "==", user.group)
    .get();

  if (groups.empty) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  const group = groups.docs[0].data();

  const {
    onePointSquareCount,
    fivePointSquareCount,
    fiftyPointSquareCount,
    specialSquareCount,
    totalScore,
  } = countBingoTable(group.bingo, user.bingoCounter);

  return NextResponse.json(
    {
      bingo: group.bingo,
      bingoCounter: user.bingoCounter,
      bingoScore: user.bingoScore,
      onePointSquareCount,
      fivePointSquareCount,
      fiftyPointSquareCount,
      specialSquareCount,
      totalScore,
    },
    { status: 200 }
  );
}
