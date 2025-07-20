import { db } from "@/lib/services/firebase.admin";
import { NextRequest, NextResponse } from "next/server";

//method to get prediction by ID
export async function GET(
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

    const predictionData = await db
      .collection("predictions")
      .doc(predictionId)
      .get();

    if (!predictionData.exists) {
      return NextResponse.json(
        { error: "Prediction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        predictionId: predictionData.id,
        ...predictionData.data(),
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Error fetching prediction : " + err);
    return NextResponse.json(
      { error: "Error fetching prediction" },
      { status: 500 }
    );
  }
}

//method to edit prediction question, solution and answer
export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ predictionId: string }>;
  }
) {
  try {
    const body = await request.json();
    const { predictionId } = await params;
    const { question, solution, showQuestion, enable, showAnswer } = body;

    const prediction = await db
      .collection("predictions")
      .doc(predictionId)
      .get();

    if (!prediction.exists) {
      return NextResponse.json(
        { error: "Prediction ID is not correct" },
        { status: 404 }
      );
    }

    await prediction.ref.update({
      question: question ?? prediction.data()?.question,
      solution: solution ?? prediction.data()?.solution,
      showQuestion: showQuestion,
      enable: enable,
      showAnswer: showAnswer,
    });

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("Error edit prediction : " + err);
    return NextResponse.json(
      {
        error: "Error edit prediction : " + err,
      },
      {
        status: 500,
      }
    );
  }
}

//method to delete prediction by ID
export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ predictionId: string }>;
  }
) {
  try {
    const { predictionId } = await params;

    await db.collection("predictions").doc(predictionId).delete();

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("Error delete prediction : " + err);
    return NextResponse.json(
      {
        error: "Error delete prediction : " + err,
      },
      {
        status: 500,
      }
    );
  }
}
