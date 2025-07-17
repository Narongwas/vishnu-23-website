import UserProfileInfo from "@/app/[locale]/profile/components/UserProfileInfo";
//import FriendList from "@/app/[locale]/profile/components/friendList";
export default function ProfilePage() {
  return (
    <div className="flex h-screen flex-col gap-6">
      <UserProfileInfo />
      {/* <FriendList /> */}
    </div>
  );
}
