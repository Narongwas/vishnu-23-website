import { NextRequest, NextResponse } from "next/server";
import { db, firebaseAdmin } from "@/lib/services/firebase.admin";
import QRCode from "qrcode";

// Function to generate a random 5-digit code
const generateCode = () => Math.floor(10000 + Math.random() * 90000).toString();

//this is a GET method to generate a QR and 5-digit code for adding friends
export async function GET(request: NextRequest) {
  // Check if the request is authenticated
  try {
    const token =
      request.headers.get("Authorization")?.split(" ")[1] ||
      request.cookies.get("authToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token and get the user ID
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    // Generate a random 5-digit code
    const code = generateCode();

    //get user name from user document
    const user = await db.collection("users").doc(uid).get();
    const name = user.data()?.name;

    //generate a QR with the user's name and token
    const qrDataUrl = await QRCode.toDataURL(
      JSON.stringify({
        name,
        token,
      })
    );

    //add the code to the user's document in Firestore
    await user.ref.update({
      addFriendCode: code,
    });

    // Return the QR code and the 5-digit code
    return NextResponse.json(
      {
        qrcode: qrDataUrl,
        code: code,
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
