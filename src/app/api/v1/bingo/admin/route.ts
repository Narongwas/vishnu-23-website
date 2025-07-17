import emailToId from "@/lib/helpers/emailToId";
import { db, firebaseAdmin } from "@/lib/services/firebase.admin";
import { NextRequest, NextResponse } from "next/server";

// PATCH : "api/v1/bingo/admin" protected
// get user uid from camperToken or friendCode and update user's bingoCounter
// only send friendCode or camperToken, not both
// clubNumber is always required
export async function PATCH(request: NextRequest) {
  // get staff token from the authorization request header or cookie
  const staffToken =
    request.headers.get("StaffAuthorization")?.split(" ")[1] ||
    request.cookies.get("StaffToken")?.value;

  // if staff token is not provided, return error
  if (!staffToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // verify the staff token
  const decodedStaffToken = await firebaseAdmin
    .auth()
    .verifyIdToken(staffToken);
  const staffEmail = decodedStaffToken.email;

  // get the staff data from the database
  const staffSnapshot = await db
    .collection("users")
    .where("email", "==", staffEmail)
    .get();

  // if staff is not found, return error
  if (staffSnapshot.empty) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const staffData = staffSnapshot.docs[0].data();

  // if staff is not a staff, return error
  if (staffData.role !== "staff") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // get camper token from the authorization request header or cookie
  const camperToken =
    request.headers.get("CamperAuthorization")?.split(" ")[1] ||
    request.cookies.get("CamperToken")?.value;

  // get friend code from the query string
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

  // if camperToken and friendCode is provided return error, only need one of them
  if (camperToken && friendCode) {
    return NextResponse.json(
      { error: "Please provide only one of camperToken or friendCode" },
      { status: 400 }
    );
  }

  let uid: string | undefined;

  // if camperToken is provided, get the uid from the camperToken
  if (camperToken) {
    const decodedCamperToken = await firebaseAdmin
      .auth()
      .verifyIdToken(camperToken);
    const email = decodedCamperToken.email;

    if (!email) {
      return NextResponse.json(
        { error: "this QR code is not correct" },
        { status: 404 }
      );
    }

    uid = emailToId(decodedCamperToken.email || "");
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

  if (bingoCounter[idx]) {
    return NextResponse.json(
      { error: "Club number already marked" },
      { status: 400 }
    );
  }

  // Set the specific index to true
  bingoCounter[idx] = true;

  // get the old user score
  const oldUserScore = userData?.bingoScore;

  let newUserScore = oldUserScore;

  const TOTAL_BINGO_SQUARES = 25;
  const N = Math.sqrt(TOTAL_BINGO_SQUARES);

  if (idx >= TOTAL_BINGO_SQUARES) {
    // outside square
    newUserScore += 1;
  } else {
    // individual square
    newUserScore += 1;

    // get row and column
    const row = Math.floor(idx / N);
    const col = idx % N;

    // check horizontal
    for (let i = 0; i < N; i++) {
      if (!bingoCounter[row * N + i]) {
        break;
      }
      if (i === N - 1) {
        newUserScore += 5;
      }
    }

    // check vertical
    for (let i = 0; i < N; i++) {
      if (!bingoCounter[i * N + col]) {
        break;
      }
      if (i === N - 1) {
        newUserScore += 5;
      }
    }

    // check all
    for (let i = 0; i < TOTAL_BINGO_SQUARES; i++) {
      if (!bingoCounter[i]) {
        break;
      }
      if (i === TOTAL_BINGO_SQUARES - 1) {
        newUserScore += 50;
      }
    }
  }

  const addedScore = newUserScore - oldUserScore;
  const newGroupScore = group.bingoScore + addedScore;

  try {
    // Use Firestore transaction to ensure atomic updates
    await db.runTransaction(async (transaction) => {
      const userRef = db.collection("users").doc(uid);
      const groupRef = db.collection("groups").doc(groupId);
      // Read current data
      const userDoc = await transaction.get(userRef);
      const groupDoc = await transaction.get(groupRef);
      if (!userDoc.exists || !groupDoc.exists) {
        throw new Error("User or group document does not exist");
      }
      // Update user's bingoCounter and score
      transaction.update(userRef, {
        bingoCounter: bingoCounter,
        bingoScore: newUserScore,
      });
      // Update group's score
      transaction.update(groupRef, {
        bingoScore: newGroupScore,
      });
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user's bingoCounter, " + error },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { msg: "Successfully updated user's bingoCounter" },
    { status: 200 }
  );
}
