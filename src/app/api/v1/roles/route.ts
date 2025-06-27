import { db } from "@/lib/services/firebase.admin";
import emailToId from "@/lib/helpers/emailToId";

export async function GET(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const studentId = emailToId(email);
    const doc = await db
      .collection("users")
      .where("studentId", "==", studentId)
      .get();

    if (doc.empty) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const userDoc = doc.docs[0];

    return Response.json(
      {
        email: userDoc.data().email,
        role: userDoc.data().role,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log("Error fetching user role:", e);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { email, role } = body;

    if (!email || !role) {
      return Response.json(
        { error: "Email and role are required" },
        { status: 400 }
      );
    }

    const studentId = emailToId(email);
    const doc = await db
      .collection("users")
      .where("studentId", "==", studentId)
      .get();

    if (doc.empty) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const userDoc = doc.docs[0];

    if (role === userDoc.data().role) {
      return Response.json(
        { error: "Role is already set to this value" },
        { status: 400 }
      );
    }

    await userDoc.ref.update({ role });
    return Response.json(null, { status: 204 });
  } catch (e) {
    console.error("Error updating role:", e);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
