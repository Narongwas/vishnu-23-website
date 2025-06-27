import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

export async function middleware(/*req: NextRequest*/) {
  // authorization middleware in frontend
  // todo : add logic to protect admin dashboard route
  // todo: get token from cookies and redirect to login if not found -- palm
  return NextResponse.next();
}
