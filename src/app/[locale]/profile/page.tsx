import Button from "@/components/Button";
import PageAction from "@/components/PageAction";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import ProfileWrapper from "@/app/[locale]/profile/components/ProfileWrapper";

const friends = [
  { id: 1, name: "แสด", avatar: "/images/default-avatar.png" },
  { id: 2, name: "เหลือง", avatar: "/images/default-avatar.png" },
  { id: 3, name: "เขียว", avatar: "/images/default-avatar.png" },
  { id: 4, name: "น้ำเงิน", avatar: "/images/default-avatar.png" },
  { id: 5, name: "คราม", avatar: "/images/default-avatar.png" },
  { id: 6, name: "แดง", avatar: "/images/default-avatar.png" },
  { id: 7, name: "บลู", avatar: "/images/default-avatar.png" },
  { id: 8, name: "กรีน", avatar: "/images/default-avatar.png" },
];

export default async function Page() {
  return (
    <ProfileWrapper>
      <div className="flex min-h-screen flex-col items-center gap-6 px-4 pt-0 pb-[148px]">
        <div className="relative flex w-full flex-col items-center gap-3 pt-6">
          <Image
            src="/images/default-avatar.png"
            alt="Profile"
            width={108}
            height={108}
            className="rounded-full object-cover"
          />

          <div className="type-display-small w-full text-center break-words text-white">
            สมชาย นามสกุลยาวจริง
          </div>

          <div className="inline-flex flex-wrap items-center justify-center gap-2 pt-3">
            <Button
              Appearance="Secondary"
              Size="Small"
              icon="edit"
              label="แก้ไข"
            />
            <Button
              Appearance="Primary"
              Size="Small"
              icon="logout"
              label="ออกจากระบบ"
            />
          </div>

          <Button
            Appearance="Secondary"
            Size="Small"
            icon="arrow_back"
            className="absolute top-4 left-0 gap-3 px-4 py-2.5"
            aria-label="ย้อนกลับ"
          />
        </div>

        <div className="flex w-full flex-col items-start gap-6">
          <div className="group flex h-11 w-full items-center gap-3">
            <div className="type-title-large-bold flex-1 text-white transition-opacity duration-300 ease-in-out group-focus-within:opacity-0">
              เพื่อนของน้อง
            </div>
            <SearchBar className="h-11 w-[148px] sm:w-[180px]" />
          </div>

          <div className="grid w-full grid-cols-6 justify-items-center gap-y-2">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="flex w-14 flex-col items-center gap-y-2"
              >
                <Image
                  className="rounded-full object-cover"
                  src={friend.avatar}
                  alt={friend.name}
                  width={60}
                  height={60}
                />
                <div className="type-title-medium text-center leading-normal tracking-tight text-white">
                  {friend.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 z-20 mx-auto w-full max-w-md">
        <PageAction />
      </div>
    </ProfileWrapper>
  );
}
