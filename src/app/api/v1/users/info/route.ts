import { db, firebaseAdmin } from "@/lib/services/firebase.admin";
import { NextRequest, NextResponse } from "next/server";

// This API route retrieves the info of user with some authorization
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  const cookieToken = request.cookies.get("authToken")?.value;
  const token = authHeader?.split(" ")[1] || cookieToken;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  //decoding the token to get the user email and role
  const session = await firebaseAdmin.auth().verifyIdToken(token);

  const email: string | undefined = session?.email;

  const doc = await db.collection("users").where("email", "==", email).get();
  if (doc.empty) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const userData = doc.docs[0].data();

  // get query
  const { searchParams } = new URL(request.url);
  const emailQry = searchParams.get("email");
  // retrieve full user info
  const fullUserInfo = (
    await db.collection("users").where("email", "==", emailQry).get()
  ).docs[0].data();
  if (!fullUserInfo) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const modifiedUserInfo = {
    ...fullUserInfo,
    sensitiveInfo: null,
  };

  // this route we do care about role and tier
  // authorize access
  // authorize the access level first
  if (userData.role == "camper") {
    // just incase but we already prevented this in fe
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (userData.tier == "group" && fullUserInfo.group != userData.group) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  // then check if it can see the sensitive info
  const rolesWithAccess = ["reg", "med", "coop", "board", "head", "admin"];
  if (rolesWithAccess.includes(userData.role)) {
    modifiedUserInfo.sensitiveInfo = fullUserInfo.sensitiveInfo;
  }
  return NextResponse.json({ users: modifiedUserInfo }, { status: 200 });
}
