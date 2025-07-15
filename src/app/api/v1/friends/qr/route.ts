import { NextRequest, NextResponse } from "next/server";
import { db, firebaseAdmin } from "@/lib/services/firebase.admin";
import QRCode from "qrcode";
import emailToId from "@/lib/helpers/emailToId";

// Function to generate a random 5-digit code
const generateCode = () => Math.floor(10000 + Math.random() * 90000).toString();

// Function to get friend code if user don't have friend code it will be created
const getFriendCode = async (uid: string) => {
  const userData = await db.collection("users").doc(uid).get();

  if (!userData.data()?.addFriendCode) {
    let code: string;
    let isCodeExist: FirebaseFirestore.QuerySnapshot;

    do {
      code = generateCode();
      isCodeExist = await db
        .collection("users")
        .where("addFriendCode", "==", code)
        .get();
    } while (!isCodeExist.empty);

    await userData.ref.update({ addFriendCode: code });
    return code;
  }

  return userData.data()?.addFriendCode;
};

//this is a GET method to generate a QR and 5-digit code for adding friends
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  // Check if the request is authenticated
  try {
    const locale = await params;

    const token =
      request.headers.get("Authorization")?.split(" ")[1] ||
      request.cookies.get("authToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token and get the user ID
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

    //get user name from user document
    const user = await db
      .collection("users")
      .doc(emailToId(decodedToken.email || ""))
      .get();

    const name = user.data()?.nickName;

    // Generate a random 5-digit code
    const code = await getFriendCode(user.id);

    //note: I'm not sure what the path is, so I decided to use this path instead
    const path = `${process.env.NEXT_PUBLIC_BASE_URL}${locale}/profile/addFriend`;

    const query = new URLSearchParams({ name, id: user.id }).toString();

    const url = `${path}?${query}`;

    //generate a QR with URL that contains the user's name and token in the query string
    const qrDataUrl = await QRCode.toDataURL(url);

    // Return the QR code and the 5-digit code
    return NextResponse.json(
      {
        qrcode: qrDataUrl,
        code: code,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error("Error generate QR code:", e);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
