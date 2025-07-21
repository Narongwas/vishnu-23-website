import emailToId from "@/lib/helpers/emailToId";
import { firebaseAuthMiddleware } from "@/lib/middleware/firebaseAuthMiddleware";
import { db } from "@/lib/services/firebase.admin";
import { NextRequest, NextResponse } from "next/server";
import { checkAnswer } from "@/lib/helpers/checker";

//get prediction answer by uid and prediction ID
async function getPredictionAnswer(uid: string, predictionId: string) {
  const [answerData, prediction] = await Promise.all([
    db
      .collection("answers")
      .where("userId", "==", uid)
      .where("predictionId", "==", predictionId)
      .select("answer", "isCorrect")
      .get(),
    db.collection("predictions").doc(predictionId).get(),
  ]);

  if (!prediction.exists) {
    return { fetchingError: true };
  }

  //If the user never answered, returns the answer as an empty string.
  if (answerData.empty) {
    return {
      predictionId,
      answer: "",
      solution: prediction.data()?.solution,
      isCorrect: false,
    };
  }

  //return an object of predictionId answer solution and boolean isCorrect
  return {
    predictionId,
    answer: answerData.docs[0].data().answer,
    solution: prediction.data()?.solution,
    isCorrect: answerData.docs[0].data().isCorrect,
  };
}

//method to get user answer by user ID and prediction ID
export async function GET(request: NextRequest) {
  try {
    const { decodedToken, error } = await firebaseAuthMiddleware(request);

    if (error || !decodedToken?.uid) {
      return NextResponse.json(
        { error: "Unauthorized" },
        {
          status: 401,
        }
      );
    }

    const prediction = request.nextUrl.searchParams.get("prediction");

    if (!prediction) {
      return NextResponse.json(
        { error: "Prediction ID is required" },
        { status: 400 }
      );
    }

    const uid = emailToId(decodedToken.email || "");

    const { answer, isCorrect, solution, fetchingError } =
      await getPredictionAnswer(uid, prediction);

    //fetching error , prediction not found
    if (fetchingError) {
      return NextResponse.json(
        { error: "Prediction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        prediction,
        answer,
        solution,
        isCorrect,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error("Error in GET request:", e);
    return NextResponse.json(
      { error: "error get answer" },
      {
        status: 500,
      }
    );
  }
}

//this is a method to change user answer
export async function PUT(request: NextRequest) {
  try {
    const { decodedToken, error } = await firebaseAuthMiddleware(request);

    if (error || !decodedToken?.uid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //get prediction ID and new answer from body
    const body = await request.json();
    const predictionId = body.prediction;
    const answer: string = body.answer;

    if (!predictionId) {
      return NextResponse.json(
        { error: "Prediction ID is required" },
        { status: 400 }
      );
    }

    if (!answer) {
      return NextResponse.json(
        { error: "Answer is required" },
        { status: 400 }
      );
    }

    const uid = emailToId(decodedToken.email || "");

    //get user answer and get prediction
    const [answerData, prediction] = await Promise.all([
      db
        .collection("answers")
        .where("userId", "==", uid)
        .where("predictionId", "==", predictionId)
        .get(),
      db.collection("predictions").doc(predictionId).get(),
    ]);

    if (!prediction.exists) {
      return NextResponse.json(
        { error: "Prediction ID is not correct" },
        { status: 404 }
      );
    }

    if (!prediction.data()?.enable) {
      return NextResponse.json(
        { error: "this prediction was closed" },
        { status: 403 }
      );
    }

    //if user not answer this prediction ,it will create new answer
    if (answerData.empty) {
      await db.collection("answers").add({
        predictionId: predictionId,
        userId: uid,
        answer: answer,
        isCorrect: checkAnswer(answer, prediction.data()?.solution),
      });
    } else {
      //if user answered before , it update the answer
      await answerData.docs[0].ref.update({
        answer: answer,
        isCorrect: checkAnswer(answer, prediction.data()?.solution),
      });
    }

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("Error changing answer : " + err);
    return NextResponse.json(
      { error: "Error changing answer" },
      { status: 500 }
    );
  }
}
