import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { firebaseAuthMiddleware } from "@/middleware/firebaseAuthMiddleware";

export async function middleware(req: NextRequest) {
  // authorization middleware in frontend
  // todo : add logic to protect admin dashboard route

  const { decodedToken, error } = await firebaseAuthMiddleware(req);

  // If user is not authenticated and trying to access a protected route, redirect to login
  if ((error || !decodedToken) && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  //  const email = decodedToken?.email;
  //  const fetchedRole  = await fetch('/api/v1/roles',{
  //    method: 'GET',
  //    headers: {
  //      'Content-Type': 'application/json',
  //    },
  //    body: JSON.stringify({ email }),
  //  })

  //  const { role } = await fetchedRole.json();

  // If user is trying to access admin route but is not an admin, redirect to home
  if (!decodedToken?.admin && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
