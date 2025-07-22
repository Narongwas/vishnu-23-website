import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { base64 } = await request.json();

    if (!base64) {
      return NextResponse.json(
        { error: "base64 is required" },
        { status: 400 }
      );
    }

    const cleanedBase64 = base64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(cleanedBase64, "base64");

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": "attachment; filename=qr-code.jpg",
      },
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 }
    );
  }
}
