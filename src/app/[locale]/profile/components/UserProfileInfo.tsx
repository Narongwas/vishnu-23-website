"use client";

import EditButton from "@/app/[locale]/profile/components/EditButton";
import LogoutButton from "@/app/[locale]/profile/components/LogoutButton";
import BackButton from "@/app/[locale]/profile/components/BackButton";
import cn from "@/lib/helpers/cn";
import getMe from "@/lib/helpers/getMe";
import { StyleableFC } from "@/lib/types/misc";
import Image from "next/image";
import { useEffect, useState } from "react";
import { User } from "@/lib/services/users";

const UserProfileInfo: StyleableFC = ({ className }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMe().then(setUser);
  }, []);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 px-6 pt-6",
        className
      )}
    >
      <BackButton className="absolute top-4 left-4" />
      <div className="flex items-center justify-center">
        <Image
          src={user?.photoURL ?? "/decorating/profile/defaultProfile.png"}
          alt={
            user?.displayName
              ? `${user.displayName}'s profile picture`
              : "User's profile picture"
          }
          width={108}
          height={108}
          className="z-10 rounded-full"
        />
      </div>
      <div className="type-display-small flex flex-col items-center justify-center text-white">
        <p>{user?.firstName ?? ""}</p>
        <p>{user?.lastName ?? ""}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <EditButton />
        <LogoutButton />
      </div>
    </div>
  );
};

export default UserProfileInfo;
