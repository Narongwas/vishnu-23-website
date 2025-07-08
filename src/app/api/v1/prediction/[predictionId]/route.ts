import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/firebase.admin";

export async function GET({
  params,
}: {
  params: Promise<{ predictionId: string }>;
}) {
  try {
    const { predictionId } = await params;

    if (!predictionId) {
      return NextResponse.json(
        { error: "Prediction ID is required" },
        { status: 400 }
      );
    }

    const predictionData = await db
      .collection("prediction")
      .doc(predictionId)
      .get();

    if (!predictionData.exists) {
      return NextResponse.json(
        { error: "Prediction ID is not correct" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        question: predictionData.data()?.question,
        solution: predictionData.data()?.solution,
        day: predictionData.data()?.day,
        time: predictionData.data()?.time,
        enable: predictionData.data()?.enable,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
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
    const { question, solution, enable } = body;

    const prediction = await db
      .collection("prediction")
      .doc(predictionId)
      .get();

    if (!prediction.exists) {
      return NextResponse.json(
        { error: "Prediction ID is not correct" },
        { status: 404 }
      );
    }

    await prediction.ref.update({
      question: question ? question : prediction.data()?.question,
      solution: solution ? solution : prediction.data()?.solution,
      enable: enable,
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

export async function DELETE({
  params,
}: {
  params: Promise<{ predictionId: string }>;
}) {
  try {
    const { predictionId } = await params;

    await db.collection("prediction").doc(predictionId).delete();

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
