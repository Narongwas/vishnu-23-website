import { db } from "@/lib/services/firebase.admin";
import { NextRequest, NextResponse } from "next/server";

//This is a function to check users' answers against the prediction solution
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ predictionId: string }> }
) {
  try {
    const { predictionId } = await params;

    if (!predictionId) {
      return NextResponse.json(
        { error: "Prediction ID is required" },
        { status: 400 }
      );
    }

    const [predictionSnap, answersSnap] = await Promise.all([
      db.collection("predictions").doc(predictionId).get(),
      db.collection("answers").where("predictionId", "==", predictionId).get(),
    ]);

    if (!predictionSnap.exists) {
      return NextResponse.json(
        { error: "Prediction not found" },
        { status: 404 }
      );
    }

    const solution = predictionSnap.data()?.solution;

    const batch = db.batch();

    answersSnap.forEach((answer) => {
      batch.update(answer.ref, {
        isCorrect: answer.data().answer.trim() === solution.trim(),
      });
    });

    await batch.commit();

    return NextResponse.json(
      { message: "Answers updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating answers:", error);
    return NextResponse.json(
      { error: "Error updating answers: " + error },
      { status: 500 }
    );
  }
}
