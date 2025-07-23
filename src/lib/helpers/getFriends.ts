export default async function getFriends() {
  const res = await fetch("/api/v1/friends", {
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("API error:", res.status, text);
    throw new Error("Failed to fetch friends");
  }
  const data = await res.json();
  console.log("Fetched friends data:", data);
  return data || [];
}
