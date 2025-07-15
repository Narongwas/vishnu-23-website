"use client";

import Interactive from "@/components/Interactive";
import cn from "@/lib/helpers/cn";
import { ClubItem } from "@/lib/types/club";
import { StyleableFC } from "@/lib/types/misc";
import Image from "next/image";

const ClubListItem: StyleableFC<{
  clubList: ClubItem[];
  onClick: (club: ClubItem) => void;
}> = ({ clubList, onClick, className, style }) => {
  return (
    <div className={cn("space-y-4", className)} style={style}>
      <p className="type-title-large text-red text-center font-bold">
        หมายเลขชมรม
      </p>
      {clubList.map((club, index) => (
        <Interactive
          key={index}
          className="type-title-medium flex w-full cursor-pointer items-center gap-2.5 px-2"
          onClick={() => {
            onClick(club);
          }}
        >
          <p className="text-red w-5">{club.boothPosition?.position}</p>
          <Image
            src={`/clubs-logo/${club.logo}`}
            alt={club.name}
            width={36}
            height={36}
            className="bg-white"
          />
          <p className="w-full text-left text-black">{club.name}</p>
        </Interactive>
      ))}
    </div>
  );
};

export default ClubListItem;
