import UserProfileInfo from "@/app/[locale]/profile/components/UserProfileInfo";
import Icon from "@/components/Icon";
//import FriendList from "@/app/[locale]/profile/components/friendList";
export default function ProfilePage() {
  return (
    <div className="flex h-screen flex-col gap-6">
      <UserProfileInfo />
      <div className="flex w-92.5 flex-col items-center justify-center gap-5 self-center px-7.5 py-24 text-white">
        <Icon name="acute" size={40} />
        <h1 className="type-headline-small text-center text-balance">
          ฟีเจอร์เพิ่มเพื่อนกำลังจะมาเร็ว ๆ นี้
        </h1>
      </div>
      {/* <FriendList /> */}
    </div>
  );
}
