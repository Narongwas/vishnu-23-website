import { NextRequest, NextResponse } from "next/server";
import { db, firebaseAdmin } from "@/lib/services/firebase.admin";
import type { User } from "@/lib/types/users";

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
  const userData = doc.docs[0].data();

  // get query
  const { searchParams } = new URL(request.url);
  const groupQry = searchParams.get("group");
  const searchQry = searchParams.get("search");
  const userType = searchParams.get("userType");
  // this route we don't care about sensitive info cause we just list users
  // authorize access
  if (userData.role == "camper") {
    // just incase but we already prevented this in fe
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (groupQry && userData.tier == "group" && groupQry != userData.group) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!groupQry && userData.tier == "group") {
    // if try to fetch all when not in core tier
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // filter by userType , group , search
  let userQry;
  if (userType == "camper") {
    userQry = db.collection("users").where("role", "==", "camper");
  } else {
    userQry = db
      .collection("users")
      .where("role", "in", [
        "med",
        "reg",
        "coop",
        "board",
        "head",
        "staff",
        "admin",
      ]); // add all non-camper role here
  }
  if (groupQry) {
    userQry = userQry.where("group", "==", groupQry);
  }
  const userSnap = await userQry.get();
  let userList: User[] = userSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as User[];
  if (searchQry) {
    userList = userList.filter(
      (user: User) =>
        user.firstName?.includes(searchQry) ||
        user.lastName?.includes(searchQry) ||
        user.email?.includes(searchQry)
    );
  }

  return NextResponse.json({ users: userList }, { status: 200 });
}
