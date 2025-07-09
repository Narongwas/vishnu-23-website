import { NextRequest, NextResponse } from "next/server";
import { db, firebaseAdmin } from "@/lib/services/firebase.admin";
import QRCode from "qrcode";
export async function GET(request: NextRequest) {
  try {
    const token =
      request.headers.get("Authorization")?.split(" ")[1] ||
      request.cookies.get("authToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    const user = await db.collection("users").doc(uid).get();
    const name = user.data()?.name;

    const qrDataUrl = await QRCode.toDataURL(
      JSON.stringify({
        name,
        token,
      })
    );

    return NextResponse.json(
      {
        qrcode: qrDataUrl,
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error("Error generate QR code:", e);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
