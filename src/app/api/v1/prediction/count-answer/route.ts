import { db } from "@/lib/services/firebase.admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const predictionId = request.nextUrl.searchParams.get("prediction");
    if (!predictionId) {
      return new Response("Prediction ID is required", { status: 400 });
    }

    // First, get all answers for this prediction
    const answersSnapshot = await db
      .collection("answers")
      .where("predictionId", "==", predictionId)
      .get();

    if (answersSnapshot.empty) {
      return NextResponse.json({ count: 0 });
    }

    // Extract userIds from answers
    const userIds = answersSnapshot.docs.map((doc) => doc.data().userId);

    // Get only unique userIds to minimize database reads
    const uniqueUserIds = [...new Set(userIds)];

    // Create a set to store all camper userIds
    const camperUserIds = new Set();

    // Batch the queries in chunks of 30 (Firestore's 'in' operator limit)
    const batchSize = 30;
    for (let i = 0; i < uniqueUserIds.length; i += batchSize) {
      const batch = uniqueUserIds.slice(i, i + batchSize);

      const batchSnapshot = await db
        .collection("users")
        .where("id", "in", batch)
        .where("role", "==", "camper")
        .get();

      batchSnapshot.docs.forEach((doc) => camperUserIds.add(doc.id));
    }

    // Count answers from users with camper role
    const camperAnswersCount = answersSnapshot.docs.filter((doc) =>
      camperUserIds.has(doc.data().userId)
    ).length;

    return NextResponse.json({ count: camperAnswersCount });
  } catch (error) {
    console.error("[COUNT_CAMPER_ANSWERS]", error);
    return new Response("Internal error", { status: 500 });
  }
}
