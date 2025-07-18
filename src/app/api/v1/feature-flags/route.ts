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
    return NextResponse.json(featureFlags, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch feature flags : ", err },
      { status: 500 }
    );
  }
}

// Post : "api/v1/feature-flags" private
// create new feature flag
export async function POST(request: NextRequest) {
  const res = await protect(request, ["admin"]);
  if (res) {
    return res;
  }
  const body = await request.json();
  const { featureName, enabled } = body;
  try {
    await addNewFeatureFlag(featureName, enabled);
    return NextResponse.json(
      {
        msg: `Successfully added new ${featureName} feature flag`,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to add feature flag : ", err },
      { status: 500 }
    );
  }
}
