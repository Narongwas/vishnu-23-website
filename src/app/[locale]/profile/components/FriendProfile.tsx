"use client";

import cn from "@/lib/helpers/cn";
import getFriend from "@/lib/helpers/getFriend";
import { StyleableFC } from "@/lib/types/misc";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Friend } from "@/lib/services/users";

interface FriendProps {
  userid: string;
  className?: string;
}

const FriendProfile: StyleableFC<FriendProps> = ({ userid, className }) => {
  const [friendData, setFriendData] = useState<Friend | null>(null);

  useEffect(() => {
    getFriend(userid).then((data) => {
      setFriendData(data.user);
    });
  }, [userid]);
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Image
        src="/decorating/profile/defaultProfile.png"
        alt="Profile Picture"
        width={60}
        height={60}
        className="rounded-full"
      />
      <p className="type-title-medium flex justify-center text-white">
        {friendData ? (friendData.nickName ?? userid) : "Loading..."}
      </p>
    </div>
  );
};

export default FriendProfile;
