import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

export async function middleware(/*req: NextRequest*/) {
  // authorization middleware in frontend
  // todo : add logic to protect admin dashboard route

  return NextResponse.next();
}
