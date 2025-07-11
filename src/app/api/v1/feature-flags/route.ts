import {
  addNewFeatureFlag,
  getAllFeatureFlags,
} from "@/app/api/v1/feature-flags/services";
import { firebaseAdmin } from "@/lib/services/firebase.admin";
import { NextRequest, NextResponse } from "next/server";

// Get : "api/v1/feature-flags" public
// get all feature flag
export async function GET() {
  try {
    const featureFlags = await getAllFeatureFlags();
    return new Response(JSON.stringify(featureFlags), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch feature flags : ", err }),
      { status: 500 }
    );
  }
}

// Post : "api/v1/feature-flags" private
// create new feature flag
export async function POST(request: NextRequest) {
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

  // Adding new feature flag logic
  const body = await request.json();
  const { featureName, enabled } = body;
  try {
    await addNewFeatureFlag(featureName, enabled);
    return NextResponse.json(
      JSON.stringify({
        msg: `Successfully added new ${featureName} feature flag`,
      }),
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      JSON.stringify({ error: "Failed to add feature flag : ", err }),
      { status: 500 }
    );
  }
}
