import BackButton from "@/components/BackButton";
import { getServerAuth } from "@/lib/firebase/getServerAuth";
import { User } from "@/lib/types/users";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import SocialSection from "@/app/[locale]/profile/edit/components/SocialSection";
import EditUserProfileButton from "@/app/[locale]/profile/edit/components/EditUserProfileButton";

export default async function EditProfilePage() {
  const t = await getTranslations("Profile");

  const { token } = await getServerAuth();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  const user: User = data.user;

  return (
    <div className="relative z-10 m-4 flex flex-col gap-6 pb-50 text-white">
      <div className="flex items-center justify-center">
        <div className="absolute top-0 left-0 z-10">
          <BackButton variant="secondary" />
        </div>
        <div className="relative inline-block">
          <Image
            src={user.profileUrl ?? "/decorating/profile/defaultProfile.png"}
            alt={
              user?.nickName
                ? `${user.nickName}'s profile picture`
                : "User's profile picture"
            }
            width={108}
            height={108}
            className="z-10 rounded-full"
          />
          <div className="absolute right-0 -bottom-2 z-20">
            <EditUserProfileButton />
          </div>
        </div>
      </div>
      <div className="type-display-small flex flex-col items-center justify-center text-white">
        <p>{user?.nickName ?? ""}</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="type-title-medium">{t("EditProfile.social.title")}</p>
        <p className="type-body-medium">{t("EditProfile.social.subtitle")}</p>
      </div>
      <div>
        <SocialSection user={user} />
      </div>
    </div>
  );
}
