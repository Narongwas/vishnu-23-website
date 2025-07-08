import { NextRequest, NextResponse } from "next/server";
import {
  deleteFeatureFlag,
  toggleFeatureFlag,
} from "@/app/api/v1/feature-flags/services";
import { firebaseAdmin } from "@/lib/services/firebase.admin";

// Put : "api/v1/feature-flags/:id" protected
// toggle feature flag
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // get token from the authorization request header
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  //decoding the token to get the user email and role
  const session = await firebaseAdmin.auth().verifyIdToken(token);

  const role: string = session?.role;

  if (role != "admin") {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 403 });
  }

  // toggling logic
  try {
    const id = (await params).id;
    const status = await toggleFeatureFlag(id);
    return new Response(
      JSON.stringify({
        msg: `Successfully toggled feature flag of id : ${id} to ${status}`,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to toggle feature flag : " + err }),
      { status: 500 }
    );
  }
}

// Delete : "api/v1/feature-flags/:id" protected
// delete feature flag
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // get token from the authorization request header
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  //decoding the token to get the user email and role
  const session = await firebaseAdmin.auth().verifyIdToken(token);

  const role: string = session?.role;

  if (role != "admin") {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 403 });
  }

  // delete logic
  try {
    const id = (await params).id;
    await deleteFeatureFlag(id);
    return new Response(
      JSON.stringify({
        msg: `Successfully deleted the feature flag of id : ${id}`,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to delete feature flag : " + err }),
      { status: 500 }
    );
  }
}
