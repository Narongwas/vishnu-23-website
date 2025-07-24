import SocialCard from "@/app/[locale]/profile/friend-info/[id]/components/SocialCard";
import BackButton from "@/components/BackButton";
import DeleteFriend from "@/app/[locale]/profile/friend-info/[id]/components/DeleteFriend";
import Image from "next/image";

export default async function FriendInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const friendId = (await params).id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${friendId}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  const groupRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/group/info/${data.group}`
  );
  const groupData = await groupRes.json();
  return (
    <div>
      <div>
        <div className="relative z-10 gap-6 px-4 pt-4">
          <div className="absolute top-4 left-4">
            <BackButton variant="secondary" />
          </div>
          <div className="absolute top-4 right-4">
            <DeleteFriend friendId={friendId} />
          </div>
          <div className="flex h-full items-center justify-center">
            <Image
              src={data.profileUrl || "/decorating/profile/defaultProfile.png"}
              alt={`${data.name}'s profile picture`}
              width={200}
              height={200}
              className="rounded-full"
            />
          </div>
        </div>
        <div className="relative flex flex-col items-center gap-2.5 text-center text-white">
          <h1 className="type-display-large">{data.nickName}</h1>
          <p className="type-title-large textwhite">{groupData.groupName}</p>
        </div>
      </div>
      <div className="mx-auto mt-8 grid grid-cols-2 gap-4 px-4">
        {Object.entries(data.contact)
          .filter(([, value]) => typeof value === "string" && value !== "")
          .map(([platform, value]) => (
            <SocialCard
              key={platform}
              platform={platform}
              value={value as string}
            />
          ))}
      </div>
    </div>
  );
}
