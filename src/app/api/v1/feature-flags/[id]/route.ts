import { NextRequest } from "next/server";
import { deleteFeatureFlag, toggleFeatureFlag } from "../services";
// import { firebaseAuthMiddleware } from "@/middleware/firebaseAuthMiddleware";

// Put : "api/v1/feature-flags/:id" protected
// toggle feature flag
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Authentication logic
  // const authResult = await firebaseAuthMiddleware(request);
  // if (authResult.error || !authResult.decodedToken) {
  //   return new Response(
  //     JSON.stringify({ error: authResult.error || "Unauthorized" }),
  //     {
  //       status: 401,
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   );
  // }
  // if (!authResult.decodedToken.admin) {
  //   return new Response(JSON.stringify({ error: "Forbidden not admin" }), {
  //     status: 403,
  //   });
  // }

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
  // Authentication logic
  // const authResult = await firebaseAuthMiddleware(request);
  // if (authResult.error || !authResult.decodedToken) {
  //   return new Response(
  //     JSON.stringify({ error: authResult.error || "Unauthorized" }),
  //     {
  //       status: 401,
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   );
  // }
  // if (!authResult.decodedToken.admin) {
  //   return new Response(JSON.stringify({ error: "Forbidden not admin" }), {
  //     status: 403,
  //   });
  // }

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
