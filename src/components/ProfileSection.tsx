import Image from "next/image";

interface User {
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

interface ProfileSectionProps {
  user: User;
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  return (
    <div className="flex flex-col items-center gap-3 pt-10">
      <Image
        src={user.avatarUrl}
        alt="profile"
        width={108}
        height={108}
        className="rounded-full object-cover"
      />
      <div className="text-white text-3xl leading-[2.25rem] text-center">
        <div>{user.firstName}</div>
        <div>{user.lastName}</div>
      </div>
    </div>
  );
}
