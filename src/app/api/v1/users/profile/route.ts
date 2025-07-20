import { db, firebaseAdmin, storage } from "@/lib/services/firebase.admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token =
      request.headers.get("Authorization")?.split(" ")[1] ||
      request.cookies.get("Token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // decoding the token to get the user email and role
    const decodeToken = await firebaseAdmin.auth().verifyIdToken(token);
    const email = decodeToken.email;
    const userId = decodeToken.uid; // Get user ID for file naming

    const userDoc = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (userDoc.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userDocRef = userDoc.docs[0].ref;
    const userData = userDoc.docs[0].data();

    if (userData.role == "camper") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    // File validation
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Invalid file type. Only JPEG, PNG, and WebP are allowed.",
        },
        { status: 400 }
      );
    }

    // Validate file size
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: "File too large. Maximum size is 5MB.",
        },
        { status: 400 }
      );
    }

    // Get Firebase Storage bucket
    const bucket = storage.bucket();

    // If user has existing profile image, delete it
    if (userData.profileUrl != "") {
      try {
        const url = new URL(userData.profileUrl);
        const pathname = decodeURIComponent(url.pathname); // /bucket-name/path/to/file
        const bucketName = bucket.name;
        const prefix = `/${bucketName}/`;
        const filePath = pathname.startsWith(prefix)
          ? pathname.slice(prefix.length)
          : pathname.substring(1); // Remove leading slash

        await bucket.file(filePath).delete();
        console.log("Old profile image deleted:", filePath);
      } catch (deleteError) {
        console.warn("Failed to delete old profile image:", deleteError);
      }
    }

    // Create a unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop();
    const fileName = `profiles/${userId}_${timestamp}.${fileExtension}`;

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a file reference in the bucket
    const fileRef = bucket.file(fileName);

    // Upload the file
    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
        metadata: {
          uploadedBy: userId,
          originalName: file.name,
          uploadedAt: new Date().toISOString(),
        },
      },
    });

    const [signedUrl] = await fileRef.getSignedUrl({
      action: "read",
      expires: Date.now() + 1000 * 60 * 60 * 24 * 10, // 10 days
    });

    // Update user document with the profile image URL
    await userDocRef.update({
      profileUrl: signedUrl,
    });

    return NextResponse.json({
      message: "Profile image uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const token =
    request.headers.get("Authorization")?.split(" ")[1] ||
    request.cookies.get("Token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  //decoding the token to get the user email and role
  const decodeToken = await firebaseAdmin.auth().verifyIdToken(token);
  const email = decodeToken.email;

  const userDoc = await db
    .collection("users")
    .where("email", "==", email)
    .get();

  if (userDoc.empty) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userData = userDoc.docs[0].data();
  if (userData.role == "camper") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // If no profile URL exists, return null
  if (!userData.profileUrl) {
    return NextResponse.json({
      error: "no profile url found",
    });
  }

  try {
    // Get Firebase Storage bucket
    const bucket = storage.bucket();

    // Extract the file path from the signed URL.
    const url = new URL(userData.profileUrl);
    const pathSegments = url.pathname.split("/");
    const filePath = pathSegments.slice(2).join("/"); // Remove bucket name and get the rest

    // Get the file from Firebase Storage
    const file = bucket.file(filePath);

    // Check if file exists
    const [exists] = await file.exists();
    if (!exists) {
      return NextResponse.json({
        error: "no profile url found",
      });
    }

    // Get file metadata
    const [metadata] = await file.getMetadata();

    // Download the file as a buffer
    const [fileBuffer] = await file.download();

    // Return the file with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": metadata.contentType || "image/jpeg",
        "Content-Length": metadata.size?.toString() || "0",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error downloading profile image:", error);
    return NextResponse.json({
      error: "no profile url found",
    });
  }
}
