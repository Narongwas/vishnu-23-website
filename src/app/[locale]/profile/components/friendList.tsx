"use client";

import FriendProfile from "@/app/[locale]/profile/components/FriendProfile";
import Header from "@/app/[locale]/profile/components/Header";
import cn from "@/lib/helpers/cn";
import getMe from "@/lib/helpers/getMe";
import { StyleableFC } from "@/lib/types/misc";
import { useEffect, useState } from "react";

const FriendList: StyleableFC = ({ className }) => {
  const [friends, setFriends] = useState<string[]>([]);

  useEffect(() => {
    getMe().then((me) => {
      setFriends(me.friends || []);
    });
  }, []);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Header />
      <div className="flex flex-wrap gap-2">
        {friends.map((friend) => (
          <FriendProfile key={friend} userid={friend} />
        ))}
      </div>
    </div>
  );
};

export default FriendList;
