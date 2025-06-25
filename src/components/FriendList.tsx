import Image from "next/image";

interface Friend {
  id: number;
  name: string;
  avatarUrl: string;
}

interface FriendListProps {
  friends: Friend[];
}

export default function FriendList({ friends }: FriendListProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {friends.map((friend) => (
        <div key={friend.id} className="flex flex-col items-center">
          <Image
            src={friend.avatarUrl}
            alt={friend.name}
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
          <span className="text-white text-sm font-bold text-center">
            {friend.name}
          </span>
        </div>
      ))}
    </div>
  );
}
