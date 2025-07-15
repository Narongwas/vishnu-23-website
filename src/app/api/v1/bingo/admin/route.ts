import emailToId from "@/lib/helpers/emailToId";
import { db, firebaseAdmin } from "@/lib/services/firebase.admin";
import { NextRequest, NextResponse } from "next/server";

// PATCH : "api/v1/bingo/admin" private
// get user uid from token or code and update user's bingoCounter
// only send code or token, not both
// clubNumber is always required
export async function PATCH(request: NextRequest) {
  const token =
    request.headers.get("Authorization")?.split(" ")[1] ||
    request.cookies.get("token")?.value;

  const code = request.nextUrl.searchParams.get("code");

  // get club number from the query string
  const clubNumber = request.nextUrl.searchParams.get("clubNumber");
  if (!clubNumber) {
    return NextResponse.json(
      { error: "Club number is required" },
      { status: 400 }
    );
  }

  // if token and code is provided return error, only need one of them
  if (token && code) {
    return NextResponse.json(
      { error: "Please provide only one of token or code" },
      { status: 400 }
    );
  }

  let uid: string | undefined;

  // if token is provided, get the uid from the token
  if (token) {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    const email = decodedToken.email;

    if (!email) {
      return NextResponse.json(
        { error: "this QR code is not correct" },
        { status: 404 }
      );
    }

    uid = emailToId(decodedToken.email || "");
  }

  // if code is provided, get the uid from the code
  if (code) {
    const userSnapshot = await db
      .collection("users")
      .where("addFriendCode", "==", Number(code))
      .get();

    if (userSnapshot.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    uid = userSnapshot.docs[0].id;
  }

  // if uid is not found, return error
  if (!uid) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Fetch current user data
  const userDoc = await db.collection("users").doc(uid).get();
  const userData = userDoc.data();

  // get the group data from the database
  const groups = await db
    .collection("groups")
    .where(
      firebaseAdmin.firestore.FieldPath.documentId(),
      "==",
      userData?.group
    )
    .get();

  if (groups.empty) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  const group = groups.docs[0].data();

  // find the index of the club number in the group bingo array
  let idx = -1;
  for (let i = 0; i < group.bingo.length; i++) {
    if (group.bingo[i] === Number(clubNumber)) {
      idx = i;
      break;
    }
  }

  // Ensure bingoCounter is an array
  const bingoCounter = Array.isArray(userData?.bingoCounter)
    ? [...userData.bingoCounter]
    : [];

  // Set the specific index to true
  bingoCounter[idx] = true;

  // Update the whole array back to Firestore
  try {
    await db.collection("users").doc(uid).update({
      bingoCounter: bingoCounter,
    });
  } catch (error) {
    console.error("Error updating user's bingoCounter:", error);
    return NextResponse.json(
      { error: "Failed to update user's bingoCounter" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { msg: "Successfully updated user's bingoCounter" },
    { status: 200 }
  );
}
