import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cookieToken = req.cookies.get("authToken")?.value;
  const token = authHeader?.split(" ")[1] || cookieToken;

  // public page routes
  const publicRoutes = ["/", "/auth/login"];
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);

  // public api routes
  const publicApiRoutes = ["/api/v1/auth/login", "/api/v1/auth/logout"];
  const isPublicApiRoute = publicApiRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // next.js stuffs
  const isStaticFile =
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes(".");

  // redirect to login if no token
  if (!token && !isPublicRoute && !isPublicApiRoute && !isStaticFile) {
    console.log("Redirecting to login - no token");
    return NextResponse.redirect(
      new URL(
        `/auth/login?redirect=${encodeURIComponent(req.nextUrl.pathname)}`,
        req.url
      )
    );
  }

  // redirect to intended page if authenticated
  if (token && req.nextUrl.pathname === "/auth/login") {
    const redirectTo = req.nextUrl.searchParams.get("redirect") || "/";
    console.log(
      "Redirecting to intended page - already authenticated:",
      redirectTo
    );
    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  // add the token to the authorization header if it exists for api routes
  if (token && req.nextUrl.pathname.startsWith("/api/") && !isPublicApiRoute) {
    const requestHeaders = new Headers(req.headers);
    if (!authHeader) {
      requestHeaders.set("authorization", `Bearer ${token}`);
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}
