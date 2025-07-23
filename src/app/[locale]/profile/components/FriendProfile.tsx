"use client";

import cn from "@/lib/helpers/cn";
import getFriend from "@/lib/helpers/getFriend";
import { StyleableFC } from "@/lib/types/misc";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Friend } from "@/lib/types/users";
import { useRouter } from "@/i18n/navigation";
interface FriendProps {
  userid: string;
  className?: string;
}

const FriendProfile: StyleableFC<FriendProps> = ({ userid, className }) => {
  const [friendData, setFriendData] = useState<Friend | null>(null);

  const router = useRouter();

  useEffect(() => {
    getFriend(userid).then((data) => {
      setFriendData(data.user);
    });
  }, [userid]);

  const handleClick = (friendId: string) => {
    router.push(`/profile/friend-info/${friendId}`);
  };

  return (
    <div
      className={cn("flex flex-col gap-2", className)}
      onClick={() => handleClick(userid)}
    >
      <Image
        src={friendData?.profileUrl || "/decorating/profile/defaultProfile.png"}
        alt="Profile Picture"
        width={60}
        height={60}
        className="rounded-full object-cover object-center"
      />
      <p className="type-title-medium flex justify-center text-white">
        {friendData ? (friendData.nickName ?? userid) : "Loading..."}
      </p>
    </div>
  );
};

export default FriendProfile;
