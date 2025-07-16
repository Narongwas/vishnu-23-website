import emailToId from "@/lib/helpers/emailToId";
import { db, firebaseAdmin } from "@/lib/services/firebase.admin";
import { NextRequest, NextResponse } from "next/server";

// PATCH : "api/v1/bingo/admin" private
// get user uid from token or friendCode and update user's bingoCounter
// only send friendCode or token, not both
// clubNumber is always required
export async function PATCH(request: NextRequest) {
  const token =
    request.headers.get("Authorization")?.split(" ")[1] ||
    request.cookies.get("token")?.value;

  const friendCode = request.nextUrl.searchParams.get("friendCode");

  // get club number from the query string
  const clubNumberStr = request.nextUrl.searchParams.get("clubNumber");
  if (!clubNumberStr) {
    return NextResponse.json(
      { error: "Club number is required" },
      { status: 400 }
    );
  }

  // convert club number to number
  const clubNumber = Number(clubNumberStr);
  if (isNaN(clubNumber)) {
    return NextResponse.json(
      { error: "Club number is invalid" },
      { status: 400 }
    );
  }

  // if token and friendCode is provided return error, only need one of them
  if (token && friendCode) {
    return NextResponse.json(
      { error: "Please provide only one of token or friendCode" },
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

  // if friendCode is provided, get the uid from the friendCode
  if (friendCode) {
    const userSnapshot = await db
      .collection("users")
      .where("addFriendCode", "==", Number(friendCode))
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

  const groupDoc = groups.docs[0];
  const group = groupDoc.data();
  const groupId = groupDoc.id;

  // find the index of the club number in the group bingo array
  let idx = -1;
  for (let i = 0; i < group.bingo.length; i++) {
    if (group.bingo[i] === clubNumber) {
      idx = i;
      break;
    }
  }

  // if club number is not found, return error
  if (idx === -1) {
    return NextResponse.json(
      { error: "Club number not found" },
      { status: 404 }
    );
  }

  // Ensure bingoCounter is an array
  const bingoCounter = Array.isArray(userData?.bingoCounter)
    ? [...userData.bingoCounter]
    : [];

  // Set the specific index to true
  bingoCounter[idx] = true;
  console.log("idx: ", idx);

  // get the old user score
  const oldUserScore = userData?.bingoScore;

  let newUserScore = oldUserScore;

  console.log("oldUserScore", oldUserScore);
  console.log("newUserScore", newUserScore);

  if (idx >= 25) {
    // outside square
    newUserScore += 2;
  } else {
    // individual square
    newUserScore += 1;

    // get row and column
    const row = Math.floor(idx / 5);
    const col = idx % 5;

    // check horizontal
    for (let i = 0; i < 5; i++) {
      console.log("horizontal: ", bingoCounter[row * 5 + i]);
      if (!bingoCounter[row * 5 + i]) {
        console.log("horizontal break");
        break;
      }
      if (i === 4) {
        newUserScore += 5;
      }
    }

    // check vertical
    for (let i = 0; i < 5; i++) {
      console.log("idx", i * 5 + col);
      console.log("vertical: ", bingoCounter[i * 5 + col]);
      if (!bingoCounter[i * 5 + col]) {
        console.log("vertical break");
        break;
      }
      if (i === 4) {
        newUserScore += 5;
      }
    }

    // check all
    for (let i = 0; i < 25; i++) {
      if (!bingoCounter[i]) {
        break;
      }
      if (i === 24) {
        newUserScore += 50;
      }
    }
  }

  const addedScore = newUserScore - oldUserScore;
  const newGroupScore = group.bingoScore + addedScore;

  console.log("addedScore", addedScore);
  console.log("newGroupScore", newGroupScore);

  try {
    // update user's bingoCounter and score
    await db.collection("users").doc(uid).update({
      bingoCounter: bingoCounter,
      bingoScore: newUserScore,
    });

    // update group's score
    await db.collection("groups").doc(groupId).update({
      bingoScore: newGroupScore,
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
