import {
  addNewFeatureFlag,
  getAllFeatureFlags,
} from "@/lib/services/featureFlags.service";
import { protect } from "@/lib/middleware/protect";
import { NextRequest, NextResponse } from "next/server";

// Get : "api/v1/feature-flags" public
// get all feature flag
export async function GET() {
  try {
    const featureFlags = await getAllFeatureFlags();
    return NextResponse.json(JSON.stringify(featureFlags), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return NextResponse.json(
      JSON.stringify({ error: "Failed to fetch feature flags : ", err }),
      { status: 500 }
    );
  }
}

// Post : "api/v1/feature-flags" private
// create new feature flag
export async function POST(request: NextRequest) {
  // get token from the authorization request header
  const res = await protect(request, ["admin"]);
  if (res) {
    return res;
  }
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
