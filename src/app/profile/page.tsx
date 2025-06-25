"use client";

import BackgroundWithNoise from "@/components/BackgroundWithNoise";
import BackButton from "@/components/BackButton";
import FriendList from "@/components/FriendList";
import ProfileSection from "@/components/ProfileSection";
import EditButton from "@/components/EditButton";
import LogoutButton from "@/components/LogoutButton";
import SearchBox from "@/components/SearchBox";
import PageAction from "@/components/PageAction";

const user = {
  firstName: "สมชาย",
  lastName: "นามสกุลยาวจริง",
  avatarUrl: "/images/default-avatar.png",
};

const friends = [
  { id: 1, name: "คราม", avatarUrl: "/images/default-avatar.png" },
  { id: 2, name: "น้ำเงิน", avatarUrl: "/images/default-avatar.png" },
  { id: 3, name: "เขียว", avatarUrl: "/images/default-avatar.png" },
  { id: 4, name: "เหลือง", avatarUrl: "/images/default-avatar.png" },
];

export default function ClientComponent() {
  return (
    <BackgroundWithNoise>
      <div className="font-bai bg-orange min-h-screen text-base">
        <div
          className="min-h-screen p-6 flex flex-col items-center gap-6 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, var(--color-red) 7.32%, var(--color-orange) 47.03%)",
          }}
        >
          <BackButton />

          <div className="flex flex-col items-center gap-6 ">
            <ProfileSection user={user} />

            <div className="flex gap-3">
              <EditButton />
              <LogoutButton />
            </div>
          </div>

          <div className="w-full max-w-md flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <span className="text-white text-lg">เพื่อนของน้อง</span>
              <SearchBox />
            </div>

            <FriendList friends={friends} />
          </div>

          <PageAction icon="person_add" text="เพิ่มเพื่อน" />
        </div>
      </div>
    </BackgroundWithNoise>
  );
}
