import SocialCard from "@/app/[locale]/profile/friend-info/[id]/components/SocialCard";

interface FriendInfoPageProps {
  params: { id: string };
}

export default async function FriendInfoPage({ params }: FriendInfoPageProps) {
  const friendId = params.id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${friendId}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
  console.log("Friend Data:", data);
  return (
    <div>
      <SocialCard platform="instagram" value={data?.instagram || ""} />
      Friend ID: {friendId}
    </div>
  );
}
