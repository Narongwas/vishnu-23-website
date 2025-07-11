export default async function getFriend(id: string) {
  const res = await fetch(`/api/v1/friends/${id}`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch friend data");
  }
  const data = await res.json();
  return data;
}
