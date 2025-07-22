import UserProfileInfo from "@/app/[locale]/profile/components/UserProfileInfo";
import FriendList from "@/app/[locale]/profile/components/friendList";
import AddFriendPageAction from "@/app/[locale]/profile/components/AddFriendPageAction";

export default function ProfilePage() {
  return (
    <div className="flex h-screen flex-col gap-6">
      <UserProfileInfo />
      <AddFriendPageAction />
      <FriendList />
    </div>
  );
}
