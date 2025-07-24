import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/firebase.admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await db.collection("users").doc(id).get();

    if (!user.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        id: user.id,
        ...user.data(),
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Error get user" }, { status: 500 });
  }
}
