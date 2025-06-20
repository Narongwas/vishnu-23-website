import { fetchFeatureFlags } from "@/helpers/featureFlags";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const featureFlags = await fetchFeatureFlags(); // from DB

  if (
    !featureFlags["groupReveal"] &&
    req.nextUrl.pathname.startsWith("/groupReveal")
  ) {
    return NextResponse.redirect(new URL("/404", req.url));
  }
  // add more protected route with feature flag later

  return NextResponse.next();
}
