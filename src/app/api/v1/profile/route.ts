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

    const userSnap = db.collection("users").doc(uid);

    if (!userSnap) {
      return NextResponse.json({ error: "User not correct" }, { status: 404 });
    }

    const { contact } = await request.json();

    const updatedData: {
      contact?: Record<string, string>;
    } = {};

    //merge contact field
    if (contact) {
      updatedData.contact = contact;
    }

    await userSnap.set(updatedData, { merge: true });

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("Error editing profile : " + err);
    return NextResponse.json(
      { error: "Error editing profile" },
      { status: 500 }
    );
  }
}
