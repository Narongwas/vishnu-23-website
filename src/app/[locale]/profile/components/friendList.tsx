"use client";

import FriendProfile from "@/app/[locale]/profile/components/FriendProfile";
import HeaderFriendList from "@/app/[locale]/profile/components/HeaderFriendList";
import cn from "@/lib/helpers/cn";
import getMe from "@/lib/helpers/getMe";
import { StyleableFC } from "@/lib/types/misc";
import { useEffect, useState } from "react";
import AddFriendArt from "@/public/decorating/profile/addFriendArt.png";
import Image from "next/image";
import AddFriendPageAction from "@/app/[locale]/profile/components/AddFriendPageAction";
import { useTranslations } from "next-intl";

const FriendList: StyleableFC = ({ className }) => {
  const t = useTranslations("Profile.FriendsList");
  const [friends, setFriends] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [friendProfiles, setFriendProfiles] = useState<
    { id: string; nickName: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);

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
      <HeaderFriendList
        search={search}
        setSearch={setSearch}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
      />
      <div className="flex flex-wrap gap-2">
        {loading ? (
          <div className="type-body-medium text-white">Loading ...</div>
        ) : (filtered.length === 0 && friends.length > 0) ||
          friends.length === 0 ? (
          <div className="type-body-medium pga px-18.5 text-white">
            <Image src={AddFriendArt} alt="Add Friend" />
            <p className="mt-3 justify-center text-center">
              {t.rich("empty", {
                strong: (chunks) => (
                  <strong className="font-bold">{chunks}</strong>
                ),
              })}
            </p>
          </div>
        ) : (
          filtered.map((friend) => (
            <FriendProfile key={friend.id} userid={friend.id} />
          ))
        )}
      </div>
      {!searchFocused && <AddFriendPageAction />}
    </div>
  );
};

export default FriendList;
