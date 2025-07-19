"use client";

import FriendProfile from "@/app/[locale]/profile/components/FriendProfile";
import HeaderFriendList from "@/app/[locale]/profile/components/HeaderFriendList";
import cn from "@/lib/helpers/cn";
import getMe from "@/lib/helpers/getMe";
import { StyleableFC } from "@/lib/types/misc";
import { useEffect, useState } from "react";
import AddFriendArt from "@/public/decorating/profile/addFriendArt.png";
import Image from "next/image";

const FriendList: StyleableFC = ({ className }) => {
  const [friends, setFriends] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [friendProfiles, setFriendProfiles] = useState<
    { id: string; nickName: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe().then((me) => {
      setFriends(me.friends || []);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all(
      friends.map(async (id) => {
        const data = await (
          await import("@/lib/helpers/getFriend")
        ).default(id);
        return { id, nickName: data.user?.nickName ?? "" };
      })
    ).then((profiles) => {
      setFriendProfiles(profiles);
      setLoading(false);
    });
  }, [friends]);

  const filtered = friendProfiles.filter(
    (f) =>
      f.nickName.toLowerCase().includes(search.toLowerCase()) ||
      f.id.includes(search)
  );

  return (
    <div className={cn("relative z-10 flex flex-col gap-4 p-4", className)}>
      <HeaderFriendList search={search} setSearch={setSearch} />
      <div className="flex flex-wrap gap-2">
        {loading ? (
          <div className="type-body-medium text-white">Loading ...</div>
        ) : filtered.length === 0 && friends.length > 0 ? (
          <div className="type-body-medium text-white">
            <Image src={AddFriendArt} alt="Add Friend" />
          </div>
        ) : (
          filtered.map((friend) => (
            <FriendProfile key={friend.id} userid={friend.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default FriendList;
