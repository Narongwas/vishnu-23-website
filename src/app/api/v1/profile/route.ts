import { NextRequest, NextResponse } from "next/server";
import { firebaseAuthMiddleware } from "@/lib/middleware/firebaseAuthMiddleware";
import { db } from "@/lib/services/firebase.admin";
import emailToId from "@/lib/helpers/emailToId";

//this is a method to edit profile
export async function PATCH(request: NextRequest) {
  try {
    const { decodedToken, error } = await firebaseAuthMiddleware(request);

    if (error || !decodedToken?.uid) {
      return NextResponse.json({ error: "Unauthorize" }, { status: 401 });
    }

    const uid = emailToId(decodedToken.email || "");

    const userSnap = await db.collection("users").doc(uid).get();

    if (!userSnap.exists) {
      return NextResponse.json({ error: "User not correct" }, { status: 404 });
    }

    const { profile, contact } = await request.json();

    //merge contact field
    const newContact = { ...(userSnap.data()?.contact ?? {}), ...contact };

    await userSnap.ref.update({
      profileURL: profile ?? userSnap.data()?.profileURL,
      contact: newContact,
    });

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("Error editing profile : " + err);
    return NextResponse.json(
      { error: "Error editing profile" },
      { status: 500 }
    );
  }
}
