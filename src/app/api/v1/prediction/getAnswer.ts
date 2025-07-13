export async function getUserAnswer() {
  const response = await fetch("/api/v1/prediction/answer", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch answer");
  }

  const answer = await response.json();

  return answer;
}
