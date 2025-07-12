import { NextRequest, NextResponse } from "next/server";
import {
  deleteFeatureFlag,
  toggleFeatureFlag,
} from "@/lib/services/featureFlags.service";
import { protect } from "@/lib/middleware/protect";

// Put : "api/v1/feature-flags/:id" protected
// toggle feature flag
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const res = await protect(request, ["admin"]);
  if (res) {
    return res;
  }

  // toggling logic
  try {
    const id = (await params).id;
    const status = await toggleFeatureFlag(id);
    return NextResponse.json(
      JSON.stringify({
        msg: `Successfully toggled feature flag of id : ${id} to ${status}`,
      }),
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
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
  const res = await protect(request, ["admin"]);
  if (res) {
    return res;
  }

  // delete logic
  try {
    const id = (await params).id;
    await deleteFeatureFlag(id);
    return NextResponse.json(
      JSON.stringify({
        msg: `Successfully deleted the feature flag of id : ${id}`,
      }),
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      JSON.stringify({ error: "Failed to delete feature flag : " + err }),
      { status: 500 }
    );
  }
}
