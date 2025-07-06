import { NextRequest, NextResponse } from "next/server";
import { firebaseAuthMiddleware } from "@/lib/middleware/firebaseAuthMiddleware";
import { db } from "@/lib/services/firebase.admin";

async function getUserHistory(uid: string) {
  const userData = await db.collection("users").doc(uid).get();

  if (!userData.exists) {
    return { getHistoryError: "User not found" };
  }

  const userHistory = userData.data()?.predictions || [];

  const [predictionsData, answersData] = await Promise.all([
    db
      .collection("predictions")
      .where("__name__", "in", userHistory)
      .select("question", "solution", "Day", "Time")
      .get(),
    db
      .collection("answers")
      .where("userId", "==", uid)
      .where("predictionId", "in", userHistory)
      .select("isCorrect", "answer")
      .get(),
  ]);

  const userHistoryData = userHistory.map((predictionId: string) => {
    const prediction = predictionsData.docs.find(
      (doc) => doc.id === predictionId
    );
    const userAnswer = answersData.docs.find(
      (doc) => doc.data().predictionId === predictionId
    );

    return {
      predictionId,
      question: prediction?.data()?.question,
      answer: userAnswer?.data()?.answer || "",
      solution: prediction?.data()?.solution,
      day: prediction?.data()?.day,
      time: prediction?.data()?.time,
      isCorrect: userAnswer?.data()?.isCorrect || false,
    };
  });

  return { userHistory: userHistoryData };
}

export async function GET(request: NextRequest) {
  try {
    const { uid, error } = await firebaseAuthMiddleware(request);

    if (!uid || error) {
      return NextResponse.json(
        { error: "Unauthorize or token is invalid" },
        { status: 401 }
      );
    }

    const { userHistory, getHistoryError } = await getUserHistory(uid);

    if (getHistoryError) {
      return NextResponse.json({ error: getHistoryError }, { status: 404 });
    }

    return NextResponse.json(
      {
        history: userHistory,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("Error in GET /api/v1/prediction/history:", err);
    return NextResponse.json(
      { error: "Error fetching predition history : " + err },
      { status: 500 }
    );
  }
}

// export async function POST(request: NextRequest) {

//     const { uid, decodedToken, error } = await firebaseAuthMiddleware(request);

//     if (!uid || error) {
//         return NextResponse.json({ error: "Unauthorize or token is invalid" }, { status: 401 });
//     }

//     const body = await request.json();
//     const predictionId : string = body.predictionId;
//     const answer : string = body.answer || "";

//     if (!predictionId || !answer) {
//         return NextResponse.json({ error: "Prediction ID and answer are required" }, { status: 400 });
//     }

// }
