import { NextRequest } from "next/server";
import { firebaseAuthMiddleware } from "@/lib/middleware/firebaseAuthMiddleware";
import { db } from "@/lib/services/firebase.admin";

async function getPredictionAnswer(uid: string, predictionId: string) {
  const [answerData, prediction] = await Promise.all([
    db
      .collection("answers")
      .where("userId", "==", uid)
      .where("predictionId", "==", predictionId)
      .select("answer", "isCorrect")
      .get(),
    db.collection("prediction").doc(predictionId).get(),
  ]);

  if (prediction.exists) {
    return { fetchingError: "this prediction not found" };
  }

  if (answerData.empty) {
    return { predictionId, answer: "", isCorrect: false };
  }

  return {
    predictionId,
    answer: answerData.docs[0].data().answer,
    isCorrect: answerData.docs[0].data().isCorrect,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { uid, error } = await firebaseAuthMiddleware(request);

    if (error || !uid) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const prediction = request.nextUrl.searchParams.get("prediction");

    if (!prediction) {
      return new Response(
        JSON.stringify({ error: "Prediction ID is required" }),
        { status: 400 }
      );
    }

    const { answer, isCorrect } = await getPredictionAnswer(uid, prediction);

    return Response.json(
      {
        prediction,
        answer,
        isCorrect,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e) {
    console.error("Error in GET request:", e);
    return new Response(JSON.stringify({ error: "error get answer" }), {
      status: 500,
    });
  }
}
