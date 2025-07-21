import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/firebase.admin";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const studentId = (await params).id;
  const user = await db.collection("users").doc(studentId).get();
  if (!user.exists) {
    return NextResponse.json({ error: "Wrong student id" }, { status: 400 });
  }
  const userGroup = user.data()?.group;
  const group = await db.collection("groups").doc(userGroup).get();
  const groupName = group.id || "";
  const registrationsPoint = group.data()?.registrationsPoint;
  return NextResponse.json({ registrationsPoint, groupName }, { status: 200 });
}
