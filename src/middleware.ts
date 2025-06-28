import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // authorization middleware in frontend
  // todo : add logic to protect admin dashboard route

  const authHeader = req.headers.get("authorization");

  const token = authHeader?.split(" ")[1];

  // If user is not authenticated and trying to access a protected route, redirect to login
  if (!token && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}
