import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/firebase.admin";
import { bilingualString } from "@/lib/types/bilingual";
import { firebaseAuthMiddleware } from "@/lib/middleware/firebaseAuthMiddleware";
import emailToId from "@/lib/helpers/emailToId";
import scoreAdmin from "@/jsondata/score-admin.json";

//this is a function to add new prediction
async function addPrediction(prediction: {
  question: bilingualString;
  solution: bilingualString;
  day: number;
  time: string;
  closeTime: string;
  typeOfAnswer?: "number" | "groupName" | "any";
}) {
  if (prediction.typeOfAnswer === undefined) {
    prediction.typeOfAnswer = "any"; // default value if not provided
  }

  await db.collection("predictions").add({
    question: prediction.question,
    solution: prediction.solution,
    day: prediction.day,
    time: prediction.time,
    closeTime: prediction.closeTime,
    typeOfAnswer: prediction.typeOfAnswer,
    showQuestion: false,
    enable: false,
    showAnswer: false,
  });
}

//this is a method to get all prediction
export async function GET(request: NextRequest) {
  try {
    const { decodedToken, error } = await firebaseAuthMiddleware(request);

    if (error || !decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const uid = emailToId(decodedToken.email || "");

    const userRole = (await db.collection("users").doc(uid).get()).data()?.role;

    if (
      !scoreAdmin.email.includes(decodedToken.email || "") &&
      userRole !== "admin"
    ) {
      return NextResponse.json(
        { error: "You cannot access this route" },
        { status: 403 }
      );
    }

    const predictions = (await db.collection("predictions").get()).docs;

    return NextResponse.json(
      {
        predictions: predictions.map((doc) => {
          return {
            predictionId: doc.id,
            ...doc.data(),
          };
        }),
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Fetching error : " + err);
    return NextResponse.json({ error: "Fetching error" }, { status: 500 });
  }
}

//this is a method to add new prediction
export async function POST(request: NextRequest) {
  try {
    const { decodedToken, error } = await firebaseAuthMiddleware(request);

    if (error || !decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const uid = emailToId(decodedToken.email || "");

    const userRole = (await db.collection("users").doc(uid).get()).data()?.role;

    if (
      !scoreAdmin.email.includes(decodedToken.email || "") &&
      userRole !== "admin"
    ) {
      return NextResponse.json(
        { error: "You cannot access this route" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { question, solution, typeOfAnswer, day, time, closeTime } = body;

    if (!question || !solution || !day || !time || !closeTime) {
      return NextResponse.json(
        {
          error: "question, solution, day and time are required",
        },
        { status: 400 }
      );
    }

    await addPrediction({
      question,
      solution,
      day,
      time,
      closeTime,
      typeOfAnswer,
    });

    return NextResponse.json(
      {
        message: "successfully create prediction",
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.error("Error create prediction : " + err);
    return NextResponse.json(
      {
        error: "Error create prediction : " + err,
      },
      {
        status: 500,
      }
    );
  }
}
