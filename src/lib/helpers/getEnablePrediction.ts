import { Prediction } from "@/lib/types/prediction";
//get prediction that enable
export async function getEnablePrediction(): Promise<Prediction | undefined> {
  const response = await fetch("/api/v1/prediction", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { predictionsData } = await response.json();

  return predictionsData.find((prediction: Prediction) => prediction.enable);
}
