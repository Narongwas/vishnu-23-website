import Image from "next/image";
import cn from "@/lib/helpers/cn";
import { HTMLAttributes } from "react";

type FriendItemProps = {
  friend: {
    id: number;
    name: string;
    avatar: string;
  };
  avatarClassName?: string;
  nameClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

const FriendItem = ({
  friend,
  avatarClassName,
  nameClassName,
  className,
  ...props
}: FriendItemProps) => {
  return (
    <div
      className={cn("flex w-14 flex-col items-center gap-y-2", className)}
      {...props}
    >
      <Image
        className={cn("rounded-full object-cover", avatarClassName)}
        src={friend.avatar}
        alt={friend.name}
        width={60}
        height={60}
      />
      <div
        className={cn(
          "type-title-medium text-center leading-normal tracking-tight text-white",
          nameClassName
        )}
      >
        {friend.name}
      </div>
    </div>
  );
};

export default FriendItem;
