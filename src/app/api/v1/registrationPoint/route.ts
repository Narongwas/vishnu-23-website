import { NextRequest, NextResponse } from "next/server";
import { firebaseAuthMiddleware } from "@/lib/middleware/firebaseAuthMiddleware";
import { db } from "@/lib/services/firebase.admin";

export async function GET(request: NextRequest) {
  try {
    const { decodedToken, error } = await firebaseAuthMiddleware(request);

    if (error || !decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const studentId = decodedToken.email?.split("@")[0] || "";

    const userSnap = await db.collection("users").doc(studentId).get();

    // if (!["admin", "camper"].includes(userSnap.data()?.role)) {
    //   return NextResponse.json(
    //     { error: "only camper and admin can access this route" },
    //     { status: 403 }
    //   );
    // }
    const userGroup = userSnap.data()?.group;

    const group = await db.collection("groups").doc(userGroup).get();

    return NextResponse.json(
      {
        registrationsPoint: group.data()?.registrationsPoint || {},
        groupName: group.id || "",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Error in get registerations:", err);
    return NextResponse.json(
      { error: "Error getting registerations" },
      { status: 500 }
    );
  }
}
