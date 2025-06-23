import { NextRequest } from "next/server";
import { addNewFeatureFlag, getAllFeatureFlags } from "./services";
// import { firebaseAuthMiddleware } from "@/middleware/firebaseAuthMiddleware";

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

  // Adding new feature flag logic
  const body = await request.json();
  const { featureName, enabled } = body;
  try {
    await addNewFeatureFlag(featureName, enabled);
    return new Response(
      JSON.stringify({
        msg: `Successfully added new ${featureName} feature flag`,
      }),
      { status: 201 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to add feature flag : ", err }),
      { status: 500 }
    );
  }
}
