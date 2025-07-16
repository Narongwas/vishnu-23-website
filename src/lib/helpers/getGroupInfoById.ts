export async function getGroupInfoById(id: string) {
  try {
    const res = await fetch(`/api/v1/group/info/${id}`);
    if (!res.ok) {
      throw new Error(`Group not found or error: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    throw new Error("Failed to fetch group info: " + err);
  }
}
