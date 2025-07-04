import { getServerAuth } from "@/lib/firebase/getServerAuth";

export default async function GroupReveal() {
  const { token } = await getServerAuth();

  if (!token) {
    return <div>You must be logged in to view your group.</div>;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/group`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>Failed to fetch group info</div>;
  }

  const data = await res.json();

  return (
    <div>
      Congratulations your group is <br />
      Group : {data.group}
    </div>
  );
}
