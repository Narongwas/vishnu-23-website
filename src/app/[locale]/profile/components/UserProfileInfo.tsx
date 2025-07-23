"use client";

// import EditButton from "@/app/[locale]/profile/components/EditButton";
import LogoutButton from "@/app/[locale]/profile/components/LogoutButton";
import cn from "@/lib/helpers/cn";
import getMe from "@/lib/helpers/getMe";
import { StyleableFC } from "@/lib/types/misc";
import { User } from "@/lib/types/users";
import Image from "next/image";
import { useEffect, useState } from "react";
import BackButtonProfile from "@/app/[locale]/profile/components/BackButtonProfile";

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
      <div className="absolute top-4 left-4 z-10">
        <BackButtonProfile variant="secondary" />
      </div>
      <div className="flex items-center justify-center">
        <Image
          src={"/decorating/profile/defaultProfile.png"}
          alt={
            user?.nickname
              ? `${user.nickname}'s profile picture`
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
        {/* <EditButton className="z-10" /> */}
        <LogoutButton className="z-10" />
      </div>
    </div>
  );
};

export default UserProfileInfo;
