import { db } from "@/lib/services/firebase.admin";
import { bilingualString } from "@/lib/types/bilingual";
import { NextRequest, NextResponse } from "next/server";

function checkAnswer(answer: string, solution: bilingualString): boolean {
  // Normalize both answer and solution to lowercase for case-insensitive comparison
  return (
    answer.trim().toLowerCase() === solution.en ||
    answer.trim().toLowerCase() === solution.th
  );
}

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

    const solution = {
      en: predictionSnap.data()?.solution.en.trim().toLowerCase,
      th: predictionSnap.data()?.solution.th.trim().toLowerCase,
    };

    const answers = answersSnap.docs;

    const BATCH_SIZE = 500;
    let batch = db.batch();

    for (let i = 0; i < answers.length; i++) {
      if (i % BATCH_SIZE === 0 && i > 0) {
        await batch.commit();
        batch = db.batch();
      }

      batch.update(answers[i].ref, {
        isCorrect: checkAnswer(answers[i].data().answer, solution),
      });
    }

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
